import { VerificationAction, VerificationStatus } from '@schema/web';
import { InjectKnex } from '@shared/utility/knex.inject';
import { Knex } from 'knex';

export class VerificationRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createVerification(
    account_id: number,
    action: VerificationAction,
    code: number,
    expired_at: Date,
  ): Promise<any> {
    return this.knex.transaction(async (trx) => {
      return trx('verifications')
        .insert({
          account_id,
          action,
          code,
          status: VerificationStatus.PENDING,
          expired_at,
        })
        .returning('*')
        .then(async ([res]) => {
          await trx('verifications')
            .where({ account_id })
            .whereNot('verifications.id', res.id)
            .update({ status: VerificationStatus.CANCEL });
          return res;
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

  async findVerification(id: number) {
    return this.knex('verifications').where({ id }).returning('*').first();
  }

  async findAllVerifications() {
    return this.knex('verifications')
      .leftJoin('accounts', 'verifications.account_id', 'accounts.id')
      .select(
        this.knex.raw(`
                json_object_build(
                    'id', accounts.id,
                    'name', concat(accounts.first_name, ' ', accounts.last_name),
                ) as account,
                verifications.status,
                verifications.action,
            `),
      );
  }

  async verifiedAccount(account_id: number) {
    return account_id;
  }
}
