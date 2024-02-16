import { Knex } from 'knex';
import { InjectKnex } from 'src/shared/utility/knex.inject';

export class AccountsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  findAllAccounts() {}
}
