import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations } from './configs/config.interface';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: configService.get<string>('DB_CLIENT'),
          connection: {
            connectionString: configService.get<string>('DB_CONNECTION_STRING'),
            host: configService.get<string>('DB_HOST'),
            port: configService.get<string>('DB_PORT'),
            database: configService.get<string>('DB_NAME'),
            password: configService.get<string>('DB_PASSWORD'),
            user: configService.get<string>('DB_USER'),
          },
          pool: {
            min: 0,
            map: 100,
          },
        },
      }),
      inject: [ConfigService]
    }),
  ],
})
export class CoreModules {}
