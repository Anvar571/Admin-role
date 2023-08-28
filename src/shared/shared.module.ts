import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { KnexOptions } from './options/knex.options';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptions } from './options/jwt.options';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useClass: JWTOptions,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    KnexModule.forRootAsync({
      useClass: KnexOptions,
    }),

  ]
})
export class SharedModule {}
