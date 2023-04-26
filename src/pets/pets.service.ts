import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from '../users/users.service';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async createPets(data: PetDto, userId: string) {
    const user = await this.checkUser(userId);
    return this.prismaService.pet.create({
      data: {
        name: data.name,
        type: data.type,
        userId: user.id,
        status: data.status,
      },
    });
  }
  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }
  async updateAnimal(data: any): Promise<any> {
    return this.prismaService.pet.create({
      data: {
        name: data.name,
        type: data.type,
        userId: data.userId,
        status: data.status,
      },
    });
  }
}
