import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma.service';
import { ProfileModule } from './profile/profile.module';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';

@Module({
  imports: [ProfileModule, forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PetsService],
  exports: [UsersModule],
})
export class UsersModule {}
