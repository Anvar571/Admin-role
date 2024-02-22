import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from 'src/shared/injects';
import { AccountsRepository } from './repository/account.repository';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountsRepository,
  ) {}

  getMe() {
    
  }
}
