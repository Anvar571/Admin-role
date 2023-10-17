import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './modules/account/account.module';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [SharedModule, AuthModule, AccountModule, PermissionsModule],
  controllers: [],
})
export class AppModule {}
