import { Dog } from '../interfaces/dog.interface';

export class CreateDogDto implements Dog {
  name: string;
  age: number;
}
