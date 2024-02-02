import {
  INestApplication,
  VersioningType,
} from '@nestjs/common';

export function setup(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
}
