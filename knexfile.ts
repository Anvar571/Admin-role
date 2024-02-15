import 'dotenv/config'

import { Knex } from 'knex'
import { databaseCofigOptions } from 'src/configs/database.config';

const config: {
	[key: string]: Knex.Config
} = {
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL || databaseCofigOptions,
		pool: {
			min: 2,
			max: 10,
		},
		seeds: {
			directory: './database/seeds',
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './database/migrations',
		},
		useNullAsDefault: true,
	},
	production: {
		client: 'pg',
		connection: databaseCofigOptions,
		pool: {
			min: 2,
			max: 10,
		},
		seeds: {
			directory: './database/seeds',
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './database/migrations',
		},
		useNullAsDefault: true,
	},
}

export default config
