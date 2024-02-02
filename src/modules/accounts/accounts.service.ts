import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./accounts.repository";

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository
  ) {}

  getMeAccount(account_id: number) {
    return this.accountRepository.getMe(account_id);
  }
}