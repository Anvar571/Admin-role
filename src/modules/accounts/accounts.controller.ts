import { Controller, Get } from '@nestjs/common';
import { AccountService } from './accounts.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account/me')
  getMeAccount() {
    return this.accountService.getMeAccount(1);
  }
}