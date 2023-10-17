import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() dto: CreateAccountDto) {
    const login = dto.email || dto.phone;
    return this.accountService.createAccount(login, dto);
  }

  @Get()
  findAllAccount() {
    const account_id = 1;
    return this.accountService.findAllAccount(account_id);
  }

  @Get(':id')
  findOneAccount(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOneAccount(id);
  }

  @Put(':id')
  updateOneAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAccountDto,
  ) {
    return this.accountService.updateAccount(id, dto);
  }

  @Delete(':id')
  deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.deleteAccount(id);
  }
}
