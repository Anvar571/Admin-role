import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './repository/account.repository';
import { PasswordRepository } from './repository/password.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, PasswordRepository],
})
export class AccountModule {}
