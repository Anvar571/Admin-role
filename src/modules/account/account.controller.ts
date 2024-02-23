import { Controller, Get, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from '@shared/decorators/find.account';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  findAll(@User('id') account_id: number) {
    return this.accountService.getMe(account_id);
  }

  @Patch("me")
  updateAccount() {}


  @Get('')
  getOneAccount() {}
}
