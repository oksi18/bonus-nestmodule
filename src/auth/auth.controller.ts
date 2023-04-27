import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/AuthUser.dto';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }
  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }
}
