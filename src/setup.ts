import { INestApplication, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function setup(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
}
