import { Module } from '@nestjs/common';
import { CoreModules } from './core/core.module';

@Module({
  imports: [CoreModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
