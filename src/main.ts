import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setup } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('HTTP_PORT') || 5000;

  setup(app);

  await app.listen(port, () => {
    console.log(`Server is running port ${port}`);
  });
}
bootstrap();
