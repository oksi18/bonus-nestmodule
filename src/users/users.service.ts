import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async createUser(data: User): Promise<User> {
    const hashPwd = await bcrypt.hash(data.password, 10);
    const profileData = { image: null };
    const newData = {
      name: data.name,
      email: data.email,
      password: hashPwd,
      profile: {
        create: profileData,
      },
    };
    return this.prismaService.user.create({
      data: {
        ...newData,
      },
    });
  }
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }
  async updateUser(id: string, data: any) {
    return this.prismaService.user.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }
  async deleteUserById(id: string) {
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }
}
