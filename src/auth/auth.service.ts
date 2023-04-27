import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserParams } from '../utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(authUserDetails: AuthUserParams) {
    const user = await this.usersService.getUserByName(
      authUserDetails.username,
    );
    const hashedPwd = await bcrypt.compare(
      authUserDetails.password,
      user.password,
    );
    if (user && hashedPwd) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
