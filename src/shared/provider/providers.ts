import knex from 'knex';
import knexFile from '../../../knexfile';
import { ACCOUNT_REPOSITORY, DB_CONNECTION_NAME } from '../injects';

export const databaseProvider = {
  provide: DB_CONNECTION_NAME,
  useFactory: async () => {
    const knexConfig = knexFile;
    return knex(knexConfig[process.env.NODE_ENV ?? 'development']);
  },
};

export const AccountRepositoryProvider = {
  provide: ACCOUNT_REPOSITORY,
  useFactory: async () => {},
};
