import {Body, HttpStatus, Injectable, Param} from '@nestjs/common';
import { UpdateUserParams } from '../utils/types';
import { PrismaService } from '../database/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashPwd = await bcrypt.hash(data.password, 10);
    const newData = {
      ...data,
      password: hashPwd,
    };
    return this.prismaService.user.create({
      data: newData,
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }

  async getAllUsers() {}

  async updateUser(@Param('id') id: string, @Body() data: any) {
    const user = await this.prismaService.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async deleteUserById(id: number) {}
}
