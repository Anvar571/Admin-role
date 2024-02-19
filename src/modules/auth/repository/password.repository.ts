import { Knex } from 'knex';
import { InjectKnex } from 'src/shared/utility/knex.inject';

export class PasswordRepository {
  constructor(@InjectKnex() private readonly knex: Knex) { }

  async interPassword(data: {
    hash: string;
    account_id: number;
  }): Promise<any> {
    const [res] = await this.knex('passwords').insert(data);
    return res;
  }

  async findHashByAccountId(account_id: number) {
    return this.knex('passwords').where({ account_id, is_active: 'true' }).first();
  }
}
