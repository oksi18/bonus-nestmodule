import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from '../entities/User';
import { UpdateUserParams } from '../utils/types';

@Injectable()
export class UsersService {
  private readonly users: User[];
  constructor() {
    this.users = [];
  }
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  getAllUsers() {
    return this.users;
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    const user = this.users.find(
      (user) => user.id.toString() === id.toString(),
    );
    if (!user) {
      return HttpStatus.NOT_FOUND;
    }
    return (this.users[this.users.indexOf(user)] = {
      ...user,
      ...updateUserDetails,
    });
  }
  deleteUserById(id: number) {
    const user = this.users.find(
      (user) => user.id.toString() === id.toString(),
    );
    if (!user) {
      return HttpStatus.NOT_FOUND;
    }
    this.users.splice(this.users.indexOf(user), 1);
    return HttpStatus.OK;
  }
}
