import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository
  ) {}

  async createAccount(login: string, dto: CreateAccountDto) {
    const exaptionEmail: RegExp =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const exaptionPhone: RegExp = /^\d+$/i;

    if (exaptionEmail.test(login)) {
      dto['email'] = login;
    } else if (exaptionPhone.test(login)) {
      dto['phone'] = login
    } else {
      throw new UnprocessableEntityException('Email or phone exists');
    }

    const {password, ...data} = dto;
    const hashPass = await bcrypt.hash(password, 10);

    return this.accountRepository.createAccountAndPassword(hashPass, data);
  }

  createAccountWithRole() {}

  findAllAccount(account_id: number) {
    return this.accountRepository.findOneAllAccount(account_id)
  }

  findAllAcounts(ids: number[]) {
    return this.accountRepository.findAccounts(ids);
  }

  findOneAccount(id: number) {
    return this.accountRepository.findOne(id);
  }

  updateAccount(id: number, dto: CreateAccountDto) {
    return this.accountRepository.update(id, dto);
  }

  deleteAccount(id: number) {
    return this.accountRepository.delete(id);
  }
}
