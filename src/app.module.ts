import { DogsModule } from './dogs/dogs.module';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DogsController } from './dogs/dogs.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DogsModule, AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        //{ path: 'dogs', method: RequestMethod.GET },
        { path: 'dogs', method: RequestMethod.PUT },
        { path: 'dogs', method: RequestMethod.DELETE },
      )
      .forRoutes(DogsController);
  }
}
