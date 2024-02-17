import 'dotenv/config';

export interface DatabaseConfigOptions {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

export interface DatabasePoolOptions {
  min: number;
  max: number;
}

export const databaseCofigOptions: DatabaseConfigOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const databasePoolOptions: DatabasePoolOptions = {
  min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN) : 1,
  max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 25,
};
