import { Knex } from 'knex';
import { InjectKnex } from 'src/shared/utility/knex.inject';
import { InternalServerErrorException } from '@nestjs/common';
import { AccountStatus } from '@schema/web';

export class AuthRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async insertAccountAndPassword(
    data: any,
    hash: string,
    status: AccountStatus,
  ) {
    try {
      const res = await this.knex.transaction(async (trx) => {
        return trx('accounts')
          .insert({ ...data, status })
          .returning('*')
          .then(async ([res]) => {
            await trx('passwords').insert({ account_id: res.id, hash });
            return res;
          })
          .then(trx.commit)
          .catch(trx.rollback);
      });
      return res;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
