import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateAccountDto } from '../dto/create-account.dto';
import { PasswordRepository } from './password.repository';

export class AccountRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  createAccountAndPassword(password: string, data: any) {
    return this.knex.transaction(async (trx) => {
      return trx('accounts')
        .insert(data)
        .returning('*')
        .then(async ([res]) => {
          await this.passwordRepository.insertPassword({
            account_id: res.id,
            hash: password,
            is_active: true,
          });

          return res;
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

  findByEmailOrPhone(email?: string, phone?: string) {
    return this.knex('accounts').where({ email }).orWhere({ phone }).first();
  }

  findAccounts(ids: number[]) {
    return this.knex('accounts').whereIn('id', ids);
  }

  findOneAllAccount(account_id: number) {
    return this.knex('accounts').where('id', account_id).select('*'); // TODO
  }

  findOne(id: number) {
    return this.knex('accounts').where({ id }).first();
  }

  update(id: number, dto: CreateAccountDto) {
    return this.knex('accounts').where({ id }).update(dto).returning('*');
  }

  delete(id: number) {
    return this.knex('accounts')
      .where({ id })
      .andWhere({ status: 'passive' })
      .update({ status: 'deleted' })
      .returning('*');
  }
}

/**
 * id: number
 * addational_ids: [1, 2, 3]
 */
