import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { AccountsRepository } from '../account/repository/account.repository';
import { PasswordRepository } from './repository/password.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AccountsRepository,
    PasswordRepository,
    JwtService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    AuthRepository,
    AccountsRepository,
    PasswordRepository,
    JwtService,
    JwtStrategy,
  ],
})
export class AuthModule {}
