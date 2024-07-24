import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TvSuscription } from './entities/tv.entity';

@ApiTags('tv-subscriptions')
@Controller('tvs')
export class TvsController {
  constructor(private readonly tvsService: TvsService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new TV subscription' })
  @ApiBody({ type: CreateTvDto })
  @ApiResponse({
    status: 201,
    description: 'The TV subscription has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createTvDto: CreateTvDto): Promise<TvSuscription> {
    return this.tvsService.create(createTvDto);
  }

  @Get('/:page/:limit')
  @ApiOperation({ summary: 'Get a paginated list of TV subscriptions' })
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
    description: 'A list of TV subscriptions.',
    example: {
      "items": [
        {
          "apikey": "string",
          "userId": {
            "name": "string",
            "email": "string",
            "phone": "string",
            "role": "person",
            "managerName": "string",
            "managerEmail": "string",
            "managerPhone": "string",
            "subscriptions": [],
            "deletedAt": "2024-07-24T13:16:37.951Z",
            "createdBy": "string",
            "updatedBy": "string",
            "deletedBy": "string"
          },
          "type": "string",
          "level": "junior",
          "technology": "Python",
          "lang": "spanish",
          "deletedAt": "2024-07-24T13:16:37.951Z",
          "createdBy": "string",
          "updatedBy": "string",
          "deletedBy": "string"
        },
        {
          "apikey": "string",
          "userId": {
            "name": "string",
            "email": "string",
            "phone": "string",
            "role": "person",
            "managerName": "string",
            "managerEmail": "string",
            "managerPhone": "string",
            "subscriptions": [],
            "deletedAt": "2024-07-24T13:16:37.951Z",
            "createdBy": "string",
            "updatedBy": "string",
            "deletedBy": "string"
          },
          "type": "string",
          "level": "junior",
          "technology": "Python",
          "lang": "spanish",
          "deletedAt": "2024-07-24T13:16:37.951Z",
          "createdBy": "string",
          "updatedBy": "string",
          "deletedBy": "string"
        }
      ],
      "totalItems": 2,
      "totalPages": 1,
      "currentPage": "1"
    },
  })
  findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<TvSuscription[]> {
    return this.tvsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a TV subscription by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the TV subscription to find',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The TV subscription with the specified ID.',
    type: TvSuscription,
  })
  @ApiResponse({ status: 404, description: 'TV subscription not found.' })
  findOne(@Param('id') id: string): Promise<TvSuscription> {
    return this.tvsService.findOne(id);
  }

  @Get('/getApiKey/:apikey')
  @ApiOperation({ summary: 'Find a TV subscription by API key' })
  @ApiParam({
    name: 'apikey',
    description: 'API key of the TV subscription to find',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The TV subscription with the specified API key.',
    type: TvSuscription,
  })
  @ApiResponse({ status: 404, description: 'TV subscription not found.' })
  async findOneByApikey(
    @Param('apikey') apikey: string,
  ): Promise<TvSuscription | { message: string }> {
    try {
      return await this.tvsService.findTvByApikey(apikey);
    } catch (error) {
      return {
        message: `The TV subscription with the API key: ${apikey} wasn't found or is already deleted`,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing TV subscription' })
  @ApiParam({
    name: 'id',
    description: 'ID of the TV subscription to update',
    type: String,
  })
  @ApiBody({ type: CreateTvDto })
  @ApiResponse({
    status: 200,
    description: 'The TV subscription has been successfully updated.',
    example: 
    {
      "_id": "string",
      "apikey": "string",
      "userId": "string",
      "level": "senior",
      "technology": "typescript",
      "lang": "spanish",
      "deletedAt": null,
      "createdBy": null,
      "updatedBy": null,
      "deletedBy": null,
      "createdAt": "2024-07-18T16:31:08.200Z",
      "updatedAt": "2024-07-18T16:31:08.200Z",
      "__v": 0
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(@Param('id') id: string, @Body() updateTvDto: UpdateTvDto): Promise<TvSuscription> {
    return this.tvsService.update(id, updateTvDto);
  }
}
