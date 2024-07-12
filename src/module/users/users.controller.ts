import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const userId = 'admin';
      return await this.usersService.create(createUserDto, userId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('Error creating user.');
      }
    }
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const userId = 'admin';
      return await this.usersService.update(id, updateUserDto, userId);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Error updating user.');
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    try {
      const userId = 'admin';
      return await this.usersService.remove(id, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Error deleting user.');
      }
    }
  }
}
