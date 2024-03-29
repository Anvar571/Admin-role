import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './provider/providers';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './pipe/validation.pipe';
import { ConfigModule } from '@nestjs/config';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptions } from './configs/jwt.options';
import { PassportModule } from '@nestjs/passport';
import { PassportConfig } from './configs/password.config';
import { AuthGuardWithJwt } from './guards/auth.guard';
import { AccountModule } from '@src/modules/account/account.module';
import { HttpExceptionFilter } from './middlewares/http.exaption';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useClass: JwtOptions,
    }),
    PassportModule.registerAsync({
      useClass: PassportConfig,
    }),
    AccountModule,
  ],
  providers: [
    databaseProvider,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuardWithJwt,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [databaseProvider],
})
export class SharedModule {}
