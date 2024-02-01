import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';

export function setup(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1'
  })
}
