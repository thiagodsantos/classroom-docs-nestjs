import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DogSchema } from 'src/schemas/dogs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Dog', schema: DogSchema }])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
