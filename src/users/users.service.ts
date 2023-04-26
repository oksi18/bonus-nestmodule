import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => PetsService)) private petsService: PetsService,
  ) {}
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
  async getUserById(id: string) {
    return this.prismaService.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
