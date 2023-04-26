import { forwardRef, Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { DatabaseModule } from '../database/database.module';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [forwardRef(() => UsersModule), DatabaseModule], // щоб обʼєднати
  controllers: [PetsController],
  providers: [PetsService, PrismaService],
  exports: [PetsService],
})
export class PetsModule {}
