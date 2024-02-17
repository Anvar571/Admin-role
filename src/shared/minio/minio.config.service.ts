import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioConfigService {
  constructor(private readonly configService: ConfigService) {}

  getEndpoint(): string {
    return this.configService.get<string>('MINIO_ENDPOINT');
  }

  getPort(): number {
    return this.configService.get<number>('MINIO_PORT');
  }

  getAccessKey(): string {
    return this.configService.get<string>('MINIO_ACCESS_KEY');
  }

  getSecretKey(): string {
    return this.configService.get<string>('MINIO_SECRET_KEY');
  }
}
