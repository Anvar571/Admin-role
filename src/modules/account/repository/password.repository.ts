import { InjectKnex, Knex } from 'nestjs-knex';

export class PasswordRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  insertPassword(data: {
    account_id: number;
    hash: string;
    is_active: boolean;
  }) {
    return this.knex('passwords').insert(data).returning('*');
  }

  updatePassword(data: {
    account_id: number;
    hash: string;
    is_active: string;
  }) {
    return this.knex('passwords')
      .where({ account_id: data.account_id })
      .update({ hash: data.hash })
      .returning('*');
  }

  findAccountPassword(account_id: number) {
    return this.knex('passwords').where({ account_id }).returning('*');
  }
}
