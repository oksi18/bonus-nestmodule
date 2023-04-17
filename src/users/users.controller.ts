import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  async createDraft(
    @Body() user: { email: string; name: string; password: string },
  ): Promise<User> {
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
}
