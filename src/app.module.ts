import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DogsController } from './dogs/dogs.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: true
  }) ,DogsModule, AuthModule, UsersModule],
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
