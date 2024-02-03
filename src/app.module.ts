import { Module } from '@nestjs/common';
import { CoreModules } from './core/core.module';
import { AccountModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    CoreModules,
    AccountModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
