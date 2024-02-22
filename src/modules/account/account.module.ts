import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountsRepository } from './repository/account.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountsRepository],
  exports: [AccountService, AccountsRepository],
})
export class AccountModule {}
