import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  providers: [ProfileService, PrismaService],
  controllers: [],
  exports: [ProfileService],
})
export class ProfileModule {}
