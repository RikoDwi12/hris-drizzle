import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT');
  if (!APP_PORT) throw new Error('port undefined')
  await app.listen(APP_PORT);
}
bootstrap();
