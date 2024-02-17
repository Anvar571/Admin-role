import { Global, Module } from '@nestjs/common';
import {
  AccountRepositoryProvider,
  databaseProvider,
} from './provider/providers';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './pipe/validation.pipe';
import { ConfigModule } from '@nestjs/config';
import { HttpInterceptor } from './interceptors/http.interceptor';

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
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
  exports: [databaseProvider, AccountRepositoryProvider],
})
export class SharedModule {}
