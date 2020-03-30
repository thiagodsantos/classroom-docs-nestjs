import { IsString, IsInt } from 'class-validator';

export class UpdateDogDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
