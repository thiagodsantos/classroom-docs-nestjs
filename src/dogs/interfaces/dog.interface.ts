import { Document } from 'mongoose';

export interface Dog extends Document {
  id?: number;
  name: string;
  age: number;
}