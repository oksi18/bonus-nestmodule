import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  async updateUserImage(id: string, file: Express.Multer.File) {
    return this.prismaService.user.update({
      where: { id: id },
      data: {
        profile: {
          update: {
            image: 'localhost:3000/uploads/' + file.originalname,
          },
        },
      },
    });
  }
}
