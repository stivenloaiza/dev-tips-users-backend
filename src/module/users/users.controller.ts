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
  UseGuards,
  /* UseGuards,
  Query, */
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/libs/guard/x-api-key.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('/create')
  async create(@Body() createUserDto: any): Promise<any> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('Error creating user.');
      }
    }
  }
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  @UseGuards(ApiKeyGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  @UseGuards(ApiKeyGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  @UseGuards(ApiKeyGuard)
  @Get('/findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return {
        statusCode: 404,
        message: `The user with the email: ${email} wasn't found`,
      };
    }
    return user;
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  @UseGuards(ApiKeyGuard)
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

  @UseGuards(ApiKeyGuard)
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
