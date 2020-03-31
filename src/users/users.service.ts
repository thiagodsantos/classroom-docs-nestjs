import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

export type UserType = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: UserType[];

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {
    this.users = [
      {
        userId: 1,
        username: 'Thiago',
        password: 'oie123',
      },
      {
        userId: 2,
        username: 'Ana',
        password: 'ola123',
      },
    ];
  }

  async findOne(username: string): Promise<UserType | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async create() {
    const teste = new Users();
    teste.firstName = 'Thiago';
    teste.lastName = 'Santos';
    await this.usersRepository.save(teste);
    return teste;
  }
}
