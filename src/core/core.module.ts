import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configs/config.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class CoreModules {}
