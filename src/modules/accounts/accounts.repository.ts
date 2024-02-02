import { Knex } from "knex";
import { Inject } from "@nestjs/common";

export class AccountRepository {
  constructor(
    @Inject() private readonly knex: Knex
  ) { }

  getMe(account_id: number) {
    return this.knex('accounts')
      .where('id', account_id)
      .select('*');
  }
}