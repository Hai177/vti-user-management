import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { ForgotModule } from '../forgot/forgot.module';
import { MailModule } from '../mail/mail.module';
import { IsExist, IsNotExist } from 'src/validators';
import { AnonymousStrategy, JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [UserModule, SessionModule, ForgotModule, PassportModule, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, IsExist, IsNotExist, JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
