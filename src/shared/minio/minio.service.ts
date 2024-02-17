import { BadRequestException, Injectable } from "@nestjs/common";
import * as Minio from 'minio';
import { MinioConfigService } from "./minio.config.service";

@Injectable()
export class MinioService {
  private readonly client: Minio.Client;
  
  constructor(private readonly configService: MinioConfigService) {
    this.client = new Minio.Client({
      endPoint: this.configService.getEndpoint(),
      port: this.configService.getPort() || 9000,
      accessKey: this.configService.getAccessKey(),
      secretKey: this.configService.getSecretKey(),
    });
  }

  getClient(): Minio.Client {
    return this.client;
  }

  async uploadFile(bucketName: string, file: Buffer, fileName: string, contentType: string): Promise<string> {
    try {
      await this.client.putObject(bucketName, fileName, file, file.length, { 'Content-Type': contentType });
      return `File ${fileName} uploaded successfully to bucket ${bucketName}`;
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

}