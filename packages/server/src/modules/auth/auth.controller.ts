import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  AuthConfirmEmailDto,
  AuthLoginDto,
  AuthForgotPasswordDto,
  AuthRegisterLoginDto,
  AuthResetPasswordDto,
  AuthUpdateDto,
} from './dtos';
import { LoginResponseType } from './types';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/common/types';
import { UserEntity } from 'src/database/entities';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseType })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseType> {
    return this.authService.validateLogin(loginDto);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto): Promise<void> {
    return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto.hash, resetPasswordDto.password);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @Get('me')
  @HttpCode(HttpStatus.OK)
  public me(@Request() request: ExpressRequest): Promise<NullableType<UserEntity>> {
    return this.authService.me(request.user);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiResponse({ status: HttpStatus.OK, type: OmitType(LoginResponseType, ['user']) })
  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request: ExpressRequest): Promise<Omit<LoginResponseType, 'user'>> {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request: ExpressRequest): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public update(@Request() request: ExpressRequest, @Body() userDto: AuthUpdateDto): Promise<NullableType<UserEntity>> {
    return this.authService.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request: ExpressRequest): Promise<void> {
    return this.authService.softDelete(request.user);
  }
}
