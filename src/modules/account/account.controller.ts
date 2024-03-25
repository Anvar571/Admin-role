import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from '@shared/decorators/find.account';
import { IdDto } from '@shared/pipe/id-validation.pipe';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  async findAll(@User('id') account_id: number) {
    const res = await this.accountService.getMe(account_id);
    return res;
  }

  @Patch('me')
  updateAccount() {}

  @Get(':id')
  getOneAccount(@Param() { data }: IdDto) {
    return this.accountService.accountOne(data.id);
  }
}
