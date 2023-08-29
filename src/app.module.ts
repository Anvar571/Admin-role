import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [AuthModule, SharedModule, UsersModule, AccountModule, PermissionsModule],
  controllers: [AppController],
})
export class AppModule {}
