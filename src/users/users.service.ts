import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '@prisma/client';
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

  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }

  async updateUser(@Param('id') id: string, @Body() data: any) {
    return await this.prismaService.user.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteUserById(id: string) {
    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }
}
