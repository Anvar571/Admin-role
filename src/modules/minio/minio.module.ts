import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio.service';
import { MinioConfigService } from './minio.config.service';
import { UploadController } from './minio.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [MinioConfigService, MinioService],
  exports: [MinioService],
})
export class MinioModule {}
