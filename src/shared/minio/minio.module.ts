import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio.service';
import { MinioConfigService } from './minio.config.service';

@Module({
  imports: [ConfigModule],
  providers: [MinioConfigService, MinioService],
  exports: [MinioService],
})
export class MinioModule {}
