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
    examples: {
      example1: {
        summary: 'Complete example',
        description:
          'A full example of the data required to create an iframe subscription',
        value: {
          "apiKey": "12345-abcdef-67890-ghijk",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "+1234567890",
          "role": "person",
          "managerName": "Jane Doe",
          "managerEmail": "jane.doe@example.com",
          "managerPhone": "+0987654321",
          "subscriptions": [],
          "deletedAt": null,
          "createdBy": null,
          "updatedBy": null,
          "deletedBy": null
        },
      }
    },
    description: 'Data to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    example: {
      "name": "string",
      "email": "jonh.doe@example.com",
      "phone": "string",
      "role": "person",
      "managerName": "string",
      "managerEmail": "jane.doe@example.com",
      "managerPhone": "string",
      "subscriptions": [],
      "deletedAt": null,
      "createdBy": null,
      "updatedBy": null,
      "deletedBy": null,
      "_id": "string",
      "createdAt": "2024-07-24T13:45:00.953Z",
      "updatedAt": "2024-07-24T13:45:00.953Z",
      "__v": 0
    }
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
    example: {
      "items": [
        {
          "_id": "string",
          "name": "string",
          "email": "?@gmail.com",
          "phone": "123456789",
          "role": "person",
          "subscriptions": [
            {
              "type": "tv",
              "level": "senior",
              "technology": "typescript",
              "lang": "spanish"
            }
          ],
          "deletedAt": null,
          "createdBy": null,
          "updatedBy": "admin",
          "deletedBy": null,
          "createdAt": "2024-07-18T16:29:03.783Z",
          "updatedAt": "2024-07-24T11:39:58.380Z",
          "__v": 0
        },
        {
          "_id": "string",
          "name": "string",
          "email": "?@gmail.com",
          "phone": "123456789",
          "role": "person",
          "subscriptions": [
            {
              "type": "tv",
              "level": "senior",
              "technology": "typescript",
              "lang": "spanish"
            }
          ],
          "deletedAt": null,
          "createdBy": null,
          "updatedBy": "admin",
          "deletedBy": null,
          "createdAt": "2024-07-18T16:29:03.783Z",
          "updatedAt": "2024-07-24T11:39:58.380Z",
          "__v": 0
        }
      ],
      "totalUsers": 2,
      "totalPages": 1,
      "currentPage": "1"
    },
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
    example: {
      "_id": "string",
      "name": "string",
      "email": "?@gmail.com",
      "phone": "123456789",
      "role": "person",
      "subscriptions": [
        {
          "type": "tv",
          "level": "senior",
          "technology": "typescript",
          "lang": "spanish"
        }
      ],
      "deletedAt": null,
      "createdBy": null,
      "updatedBy": "admin",
      "deletedBy": null,
      "createdAt": "2024-07-18T16:29:03.783Z",
      "updatedAt": "2024-07-24T11:39:58.380Z",
      "__v": 0
    },
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
    example: {
      "_id": "string",
      "name": "string",
      "email": "?@gmail.com",
      "phone": "34567543",
      "role": "person",
      "subscriptions": [],
      "deletedAt": null,
      "createdBy": null,
      "updatedBy": "admin",
      "deletedBy": null,
      "createdAt": "2024-07-18T16:36:54.227Z",
      "updatedAt": "2024-07-24T14:37:15.297Z",
      "__v": 0
    },
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
