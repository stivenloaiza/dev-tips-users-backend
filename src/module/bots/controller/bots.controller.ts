import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { BotsSubscriptionService } from '../service/bots.service';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';
import {
  BotsSubscriptionNotFoundException,
  BotsSubscriptionBadRequestException,
} from '../exception/bots-suscription.exceptions';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BotsSubscription } from '../entities/bots.entity';

@ApiTags('Bots Subscriptions')
@Controller('bots-subscriptions')
export class BotsSubscriptionController {
  constructor(
    private readonly botsSubscriptionService: BotsSubscriptionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bots subscription' })
  @ApiBody({ type: CreateBotsSubscriptionDto })
  @ApiResponse({
    status: 201,
    description: 'The bots subscription has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async create(@Body() createDto: CreateBotsSubscriptionDto) {
    try {
      const createdSubscription =
        await this.botsSubscriptionService.create(createDto);
      return {
        message: 'Bots subscription created successfully',
        data: createdSubscription,
      };
    } catch (error) {
      if (error instanceof BotsSubscriptionBadRequestException) {
        return {
          message: error.message,
          error: error.message,
        };
      }
      throw error;
    }
  }

  @Get('/:page/:limit')
  @ApiOperation({ summary: 'Get a paginated list of bots subscriptions' })
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
    description: 'A list of bots subscriptions.',
    example: {
      message: 'List of all bots subscriptions',
      data: {
        bots: [
          {
            _id: 'string',
            apikey: 'string',
            userId: {
              _id: 'string',
              name: 'string',
              email: 'string',
              phone: 'string',
              role: 'string',
            },
            frequency: 'daily',
            channelType: 'Telegram',
            level: 'junior',
            technology: 'Python',
            lang: 'english',
            channelId: 'test123456',
            deletedAt: null,
            createdBy: null,
            updatedBy: null,
            deletedBy: null,
            createdAt: '2024-07-18T16:34:28.389Z',
            updatedAt: '2024-07-24T12:11:38.515Z',
            __v: 0,
          },
          {
            _id: 'string',
            apikey: 'string',
            userId: {
              _id: 'string',
              name: 'string',
              email: 'string',
              phone: 'string',
              role: 'string',
            },
            frequency: 'daily',
            channelType: 'Telegram',
            level: 'junior',
            technology: 'Python',
            lang: 'english',
            channelId: 'test123456',
            deletedAt: null,
            createdBy: null,
            updatedBy: null,
            deletedBy: null,
            createdAt: '2024-07-18T16:34:28.389Z',
            updatedAt: '2024-07-24T12:11:38.515Z',
            __v: 0,
          },
        ],
        totalBots: 2,
        totalPages: 1,
        currentPage: '1',
      },
    },
  })
  async findAll(@Param('page') page: number, @Param('limit') limit: number) {
    const subscriptions = await this.botsSubscriptionService.findAll(
      page,
      limit,
    );
    return {
      message: 'List of all bots subscriptions',
      data: subscriptions,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bots subscription by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the bots subscription to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The bots subscription found.',
    example: {
      message: 'string',
      data: {
        _id: 'string',
        apikey: 'string',
        userId: 'string',
        frequency: 'daily',
        channelType: 'Telegram',
        level: 'junior',
        technology: 'Python',
        lang: 'english',
        channelId: 'string',
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        createdAt: '2024-07-18T16:34:28.389Z',
        updatedAt: '2024-07-24T12:11:38.515Z',
        __v: 0,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bots subscription not found.',
  })
  async findOne(@Param('id') id: string) {
    try {
      const subscription = await this.botsSubscriptionService.findOne(id);
      return {
        message: 'Bots subscription found',
        data: subscription,
      };
    } catch (error) {
      if (error instanceof BotsSubscriptionNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('/getApiKey/:apikey')
  @ApiOperation({ summary: 'Get a bots subscription by API key' })
  @ApiParam({
    name: 'apikey',
    description: 'API key of the bots subscription to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The bots subscription found.',
    example: {
      _id: 'string',
      apikey: 'string',
      userId: 'string',
      frequency: 'daily',
      channelType: 'Telegram',
      level: 'junior',
      technology: 'Python',
      lang: 'english',
      channelId: 'string',
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
      createdAt: '2024-07-18T16:34:28.389Z',
      updatedAt: '2024-07-24T16:57:03.127Z',
      __v: 0,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bots subscription not found.',
  })
  async findOneByApikey(
    @Param('apikey') apikey: string,
  ): Promise<BotsSubscription> {
    try {
      return await this.botsSubscriptionService.findBotsByApikey(apikey);
    } catch (error) {
      throw new Error(
        `There is an issue with finding one by API key: ${error}`,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing bots subscription' })
  @ApiParam({
    name: 'id',
    description: 'ID of the bots subscription to update',
    type: String,
  })
  @ApiBody({ type: UpdateBotsSubscriptionDto })
  @ApiResponse({
    status: 200,
    description: 'The bots subscription has been successfully updated.',
    example: {
      message: 'Bots subscription updated successfully',
      data: {
        _id: 'string',
        apikey: 'string',
        userId: 'string',
        frequency: 'daily',
        channelType: 'Telegram',
        level: 'junior',
        technology: 'Python',
        lang: 'english',
        channelId: 'string',
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        createdAt: '2024-07-18T16:34:28.389Z',
        updatedAt: '2024-07-24T16:57:03.127Z',
        __v: 0,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBotsSubscriptionDto,
  ) {
    try {
      const updatedSubscription = await this.botsSubscriptionService.update(
        id,
        updateDto,
      );
      return {
        message: 'Bots subscription updated successfully',
        data: updatedSubscription,
      };
    } catch (error) {
      if (error instanceof BotsSubscriptionBadRequestException) {
        return {
          message: error.message,
          error: error.message,
        };
      }
      throw error;
    }
  }
}
