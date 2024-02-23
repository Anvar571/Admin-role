import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from './repository/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountsRepository) {}

  async getMe(account_id: number) {
    const res = await this.accountRepository.findByAnyParam({ id: account_id });

    if (!res) {
      throw new NotFoundException('This user was not found');
    }

    return res;
  }
}
