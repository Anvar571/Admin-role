import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { PasswordRepository } from './repository/password.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PasswordRepository],
  exports: [AuthService, AuthRepository, PasswordRepository],
})
export class AuthModule {}
