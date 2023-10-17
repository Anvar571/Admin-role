import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: configService.get<string>('DB_CLIENT'),
          debug: configService.get<boolean>('DB_DEBUG'),
          connection: {
            host: configService.get<string>('DB_HOST'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            port: configService.get<number>('DB_PORT'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SharedModule {}
