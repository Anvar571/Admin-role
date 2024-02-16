import { Knex } from 'knex';
import { InjectKnex } from 'src/shared/utility/knex.inject';

export class AuthRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}
}
