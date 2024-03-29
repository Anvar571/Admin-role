import { Knex } from 'knex';
import { InjectKnex } from 'src/shared/utility/knex.inject';

export class AccountsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  findByPhone(phone: string) {
    return this.knex('accounts').where({ phone }).first();
  }

  findByAnyParam(param: any) {
    return this.knex('accounts')
      .where(param)
      .andWhere('status', 'active')
      .first();
  }
}
