import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { MinioModule } from './modules/minio/minio.module';

@Module({
  imports: [
    SharedModule, 
    AuthModule, 
    AccountModule,
    MinioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
