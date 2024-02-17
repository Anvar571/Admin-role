import { Global, Module } from '@nestjs/common';
import {
  AccountRepositoryProvider,
  databaseProvider,
} from './provider/providers';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './pipe/validation.pipe';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './middlewares/http.exaption';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    databaseProvider,
    AccountRepositoryProvider,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [databaseProvider, AccountRepositoryProvider],
})
export class SharedModule {}
