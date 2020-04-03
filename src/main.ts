import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { every } from './common/middleware/every.middleware';
import * as compression from 'compression';
import * as helmet from 'helmet';
//import * as cookieParser from 'cookie-parser';
//import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.use(cookieParser());
  //app.use(csurf({ cookie: true }));
  app.use(compression());
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  app.use(every);
  await app.listen(3000);
}
bootstrap();
