import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNumber } from 'util';

@Injectable()
export class MinioConfigService {
  constructor(private readonly configService: ConfigService) {}

  getEndpoint(): string {
    return this.configService.get<string>('MINIO_ENDPOINT');
  }

  getPort(): number {
    const port = this.configService.get<number>('MINIO_PORT');
    if (!isNumber(port)) return 9000;
    return this.configService.get<number>('MINIO_PORT');
  }

  getAccessKey(): string {
    return this.configService.get<string>('MINIO_ACCESS_KEY');
  }

  getSecretKey(): string {
    return this.configService.get<string>('MINIO_SECRET_KEY');
  }
}
