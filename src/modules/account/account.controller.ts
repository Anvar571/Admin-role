import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from '@shared/decorators/find.account';
import { IdDto } from '@shared/pipe/id-validation.pipe';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get('me')
  findAll(@User('id') account_id: number) {
    return this.accountService.getMe(account_id);
  }

  @Patch('me')
  updateAccount() { }

  @Get(':id')
  getOneAccount(@Param() { data }: IdDto) { 
    return this.accountService.accountOne(data.id);
  }
}
