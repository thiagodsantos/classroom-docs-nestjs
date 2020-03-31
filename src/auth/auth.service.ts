import { Injectable } from '@nestjs/common';
import { UsersService, UserType } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export type Payload = {
  username: string;
  sub: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    /* const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    } */
    return null;
  }

  async login(user: UserType) {
    const payload: Payload = { username: user.username, sub: user.userId };
    return {
      "access_token": this.jwtService.sign(payload),
    };
  }
}
