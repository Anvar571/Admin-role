import { registerAs } from '@nestjs/config';

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Testing = 'testing',
}

export enum ConfigKey {
  AppConfig = 'AppConfig',
  DBConfig = 'DBConfig',
}

export const AppConfig = registerAs(ConfigKey.AppConfig, () => ({
  env:
    Environment[process.env.NODE_ENV as keyof typeof Environment] ||
    'development',
  port: Number(process.env.HTTP_PORT) || 5000,
}));

export const DBConfig = registerAs(ConfigKey.DBConfig, () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
}));

export const configurations = [AppConfig, DBConfig];
