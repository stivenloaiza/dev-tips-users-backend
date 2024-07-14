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
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { validateHeaderValue } from 'http';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: any): Promise<any> {
    try {
      console.log(createUserDto)
      return await this.usersService.create(createUserDto);
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

  @Get('/:email')
  async findOneByEmail(
    @Param('email') email: string,
    ): Promise<User>{

    try {
      return await this.usersService.findUserByEmail(email)
    } catch(error){
      throw new Error(`There is a isssue with find oen by email: ${error}`)
    }
    
  }


  @Get('/:apikey')
  async findOneByApikey(
    @Param('apikey') apikey: string,
    ): Promise<User>{

    try {
      return await this.usersService.findUserByApikey(apikey)
    } catch(error){
      throw new Error(`There is a isssue with find oen by email: ${error}`)
    }
    
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
