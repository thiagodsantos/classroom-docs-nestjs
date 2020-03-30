import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { every } from './common/middleware/every.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(every);
  await app.listen(3000);
}
bootstrap();
