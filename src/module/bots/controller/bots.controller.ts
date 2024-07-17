import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BotsSubscriptionService } from '../service/bots.service';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';
import {
  BotsSubscriptionNotFoundException,
  BotsSubscriptionBadRequestException,
} from '../exception/bots-suscription.exceptions';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BotsSubscription } from '../entities/bots.entity';
import { ApiKeyGuard } from 'src/libs/guard/x-api-key.guard';

@ApiTags('bots-subscriptions')
@Controller('bots-subscriptions')
export class BotsSubscriptionController {
  constructor(
    private readonly botsSubscriptionService: BotsSubscriptionService,
  ) {}

  @Post()
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


  @Get()
  async findAll() {
    const subscriptions = await this.botsSubscriptionService.findAll();
    return {
      message: 'List of all bots subscriptions',
      data: subscriptions,
    };
  }

 
  
  @Get(':id')
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
  async findOneByApikey(
    @Param('apikey') apikey: string,
  ): Promise<BotsSubscription> {
    try {
      return await this.botsSubscriptionService.findBotsByApikey(apikey);
    } catch (error) {
      throw new Error(`There is a isssue with find oen by apikey: ${error}`);
    }
  }


 
 
  @Put(':id')
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
