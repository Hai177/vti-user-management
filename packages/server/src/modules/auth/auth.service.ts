import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import bcrypt from 'bcrypt';

import { RoleEnum, StatusEnum } from 'src/common/enums';
import { LoginResponseType } from './types';
import { JwtPayloadType, JwtRefreshPayloadType } from './strategies/types';
import { SessionEntity, UserEntity } from 'src/database/entities';
import { NullableType } from 'src/common/types';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { ForgotService } from '../forgot/forgot.service';
import { MailService } from '../mail/mail.service';
import { AuthUpdateDto, AuthLoginDto, AuthRegisterLoginDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private forgotService: ForgotService,
    private mailService: MailService
  ) {}

  async validateLogin(loginDto: AuthLoginDto): Promise<LoginResponseType> {
    const user = await this.userService.findUserByUsername(loginDto.username);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            username: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isValidPassword = await bcrypt.compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const session = await this.sessionService.create({
      user,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      roles: user.roles,
      sessionId: session.id,
    });

    delete user.password;

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(randomStringGenerator(), salt);

    await this.userService.create({
      ...dto,
      email: dto.email,
      roles: [RoleEnum.USER],
      status: StatusEnum.ACTIVE,
      hash,
    });
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<UserEntity>> {
    const user = await this.userService.findUserById(userJwtPayload.id);

    if (user.password) {
      delete user.password;
    }

    if (user.previousPassword) {
      delete user.previousPassword;
    }

    return user;
  }

  async update(userJwtPayload: JwtPayloadType, userDto: AuthUpdateDto): Promise<NullableType<UserEntity>> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.userService.findOne({
          id: userJwtPayload.id,
        });

        if (!currentUser) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                user: 'userNotFound',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY
          );
        }

        const isValidOldPassword = await bcrypt.compare(userDto.oldPassword, currentUser.password);

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY
          );
        } else {
          await this.sessionService.softDelete({
            user: {
              id: currentUser.id,
            },
            excludeId: userJwtPayload.sessionId,
          });
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
    }

    await this.userService.update(userJwtPayload.id, userDto);

    return this.userService.findUserById(userJwtPayload.id);
  }

  async refreshToken(data: Pick<JwtRefreshPayloadType, 'sessionId'>): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      id: data.sessionId,
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      roles: session.user.roles,
      sessionId: session.id,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    user.hash = null;
    user.status = StatusEnum.ACTIVE;
    await this.userService.update(user.id, user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(randomStringGenerator(), salt);

    await this.forgotService.create({
      hash,
      user,
    });

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
      },
    });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.forgotService.findOne({
      hash,
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const user = forgot.user;
    user.password = password;

    await this.sessionService.softDelete({
      user: {
        id: user.id,
      },
    });
    await this.userService.update(user.id, user);
    await this.forgotService.softDelete(forgot.id);
  }

  async softDelete(user: UserEntity): Promise<void> {
    await this.userService.softDelete(user.id);
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: data.sessionId,
    });
  }

  private async getTokensData(data: {
    id: UserEntity['id'];
    roles: UserEntity['roles'];
    sessionId: SessionEntity['id'];
  }) {
    const tokenExpiresIn = this.configService.get<string>('AUTH_JWT_TOKEN_EXPIRES_IN');

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          roles: data.roles,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.get('AUTH_JWT_SECRET'),
          expiresIn: tokenExpiresIn,
        }
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.get('AUTH_REFRESH_SECRET'),
          expiresIn: this.configService.get('AUTH_REFRESH_TOKEN_EXPIRES_IN'),
        }
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
