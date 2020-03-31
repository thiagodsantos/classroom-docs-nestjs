import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog } from "./interfaces/dog.interface";
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  constructor(@InjectModel('Dog') private dogModel: Model<Dog>) {}

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  createFromDto(createDogDto: CreateDogDto): Promise<Dog> {
    const createdDog = new this.dogModel(createDogDto);
    return createdDog.save();
  }
}
