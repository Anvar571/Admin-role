import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MinioService } from './minio.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadController {
  constructor(private readonly minioService: MinioService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPhoto(@UploadedFile() file) {
    const bucketName = 'roleproject';
    const fileName = file.originalname;
    const contentType = file.mimetype;
    

    const result = await this.minioService.uploadFile(
      bucketName,
      file.buffer,
      fileName,
      contentType,
    );
    return { message: result };
  }
}
