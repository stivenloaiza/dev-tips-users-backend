import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EmailSubscription } from './entities/email.entity';

@ApiTags('Email Subscriptions')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new email subscription' })
  @ApiBody({
    description: 'Details of the email subscription to create',
    type: CreateEmailDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The email subscription has been successfully created.',
    example: {
      "userId": "string",
      "type": "email",
      "frequency": "weekly",
      "level": "junior",
      "technology": "Python",
      "lang": "spanish",
      "_id": "string",
      "createdAt": "2024-07-24T18:44:55.335Z",
      "updatedAt": "2024-07-24T18:44:55.335Z",
      "__v": 0
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createEmailDto: CreateEmailDto): Promise<EmailSubscription> {
    return this.emailService.create(createEmailDto);
  }

  @Get('/:page/:limit')
  @ApiOperation({ summary: 'Get a paginated list of email subscriptions' })
  @ApiParam({
    name: 'page',
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiParam({
    name: 'limit',
    description: 'Number of items per page',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A list of email subscriptions.',
    example: {
      "items": [
        {
          "_id": "string",
          "apikey": "string",
          "userId": {
            "_id": "string",
            "name": "string",
            "email": "?@gmail.com",
            "phone": "34567543",
            "role": "person"
          },
          "frequency": "daily",
          "level": "senior",
          "technology": "JavaScript",
          "lang": "spanish",
          "createdAt": "2024-07-18T16:39:25.583Z",
          "updatedAt": "2024-07-18T16:39:25.583Z",
          "__v": 0
        },
        {
          "_id": "string",
          "apikey": "string",
          "userId": {
            "_id": "string",
            "name": "string",
            "email": "?@gmail.com",
            "phone": "34567543",
            "role": "person"
          },
          "frequency": "daily",
          "level": "senior",
          "technology": "JavaScript",
          "lang": "spanish",
          "createdAt": "2024-07-18T16:39:25.583Z",
          "updatedAt": "2024-07-18T16:39:25.583Z",
          "__v": 0
        }, 
      ],
      "totalItems": 2,
      "totalPages": 1,
      "currentPage": "1"
    },
  })
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<EmailSubscription[]> {
    return this.emailService.findAll(page, limit);
  }

  @Get('/find/field/:field/value/:value')
  @ApiOperation({
    summary: 'Find an email subscription by a specific field and value',
  })
  @ApiParam({
    name: 'field',
    description: 'The field to search by',
    enum: [
      'apikey',
      'userId',
      'type',
      'frequency',
      'level',
      'technology',
      'lang',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'createdBy',
      'updatedBy',
      'deletedBy',
    ],
  })
  @ApiParam({
    name: 'value',
    description: 'The value of the field to search for',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The email subscription matching the field and value.',
    example: [
      {
        "_id": "string",
        "apikey": "string",
        "userId": "string",
        "frequency": "daily",
        "level": "senior",
        "technology": "JavaScript",
        "lang": "spanish",
        "createdAt": "2024-07-18T16:39:25.583Z",
        "updatedAt": "2024-07-18T16:39:25.583Z",
        "__v": 0
      }
    ],
  })
  @ApiResponse({ status: 404, description: 'Email subscription not found.' })
  findOne(@Param('field') field: string, @Param('value') value: string) {
    return this.emailService.findOneByField(field, value);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update an existing email subscription' })
  @ApiParam({
    name: 'id',
    description: 'ID of the email subscription to update',
    type: String,
  })
  @ApiBody({
    description: 'Details of the email subscription to update',
    type: EmailSubscription,
  })
  @ApiResponse({
    status: 200,
    description: 'The email subscription has been successfully updated.',
    type: EmailSubscription,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ): Promise<EmailSubscription> {
    return this.emailService.update(+id, updateEmailDto);
  }

  @Delete('/apikey/:apikey')
  @ApiOperation({ summary: 'Remove an email subscription by API key' })
  @ApiParam({
    name: 'apikey',
    description: 'API key of the email subscription to remove',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The email subscription has been successfully removed.',
    type: EmailSubscription,
  })
  @ApiResponse({ status: 404, description: 'Email subscription not found.' })
  remove(@Param('apikey') apikey: string) {
    return this.emailService.remove(apikey);
  }

}
