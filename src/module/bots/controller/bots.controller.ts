import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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
import { ApiTags } from '@nestjs/swagger';

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
