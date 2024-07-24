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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data to create a new user',
    examples: {
      example1: {
        summary: 'Complete example',
        description: 'A full example of the data required to create a user',
        value: {
          apiKey: '12345-abcdef-67890-ghijk',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          role: 'person',
          managerName: 'Jane Doe',
          managerEmail: 'jane.doe@example.com',
          managerPhone: '+0987654321',
          subscriptions: [
            {
              type: 'iframe',
              data: {
                apikey: '67890-ghijk-12345-abcdef',
                userId: '60c72b2f9b1e8e2f88d9b123',
                type: 'Basic',
                level: 'junior',
                technology: 'JavaScript',
                lang: 'english',
                iframe:
                  '<iframe src="https://example.com/iframe" width="600" height="400"></iframe>',
              },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
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

  @Get('/:page/:limit')
  @ApiOperation({ summary: 'Get a paginated list of users' })
  @ApiParam({
    name: 'page',
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiParam({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of users returned successfully.',
    type: [User],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<User[]> {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User details returned successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Get('/findByEmail/:email')
  @ApiOperation({ summary: 'Get user details by email' })
  @ApiParam({ name: 'email', type: String, description: 'Email of the user' })
  @ApiResponse({
    status: 200,
    description: 'User details returned successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data to update the user',
    examples: {
      example1: {
        summary: 'Partial update example',
        description: 'An example of partially updating a user',
        value: {
          name: 'Updated Name',
          email: 'updated.email@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
  @ApiOperation({ summary: 'Delete a specific user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
