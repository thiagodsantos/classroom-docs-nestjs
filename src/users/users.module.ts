import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersSubscriber } from './users.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
