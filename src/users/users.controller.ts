import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { ProfileService } from './profile/profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetDto } from '../pets/dto/pet.dto';
import { PetsService } from '../pets/pets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly profileService: ProfileService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.usersService.updateUser(id, data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
  @Post('profile/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateUserImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.updateUserImage(id, file);
  }
  @Post('/animals/:userId')
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `${userId} not found` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createPets(body, userId));
  }
}
