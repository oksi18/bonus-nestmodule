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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from '@prisma/client';
import { ProfileService } from './profile/profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetDto } from '../pets/dto/pet.dto';
import { PetsService } from '../pets/pets.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly profileService: ProfileService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Put('update/:id')
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.usersService.updateUser(id, data);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
  @Post('profile/:id')
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
