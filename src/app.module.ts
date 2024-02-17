import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
