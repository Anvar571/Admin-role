import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from '@shared/decorators/find.account';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  findAll(@User('ids') account_id: number) {
    console.log(account_id, 'account_id');
    
    return 'first account';
  }
}
