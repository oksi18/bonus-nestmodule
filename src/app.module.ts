import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype.split('/')[1],
          );
        },
      }),
    }),
    PetsModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class AppModule {}
