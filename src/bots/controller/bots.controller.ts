import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException} from '@nestjs/common';
import { BotsSubscriptionService } from '../service/bots.service';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';

@Controller('bots-subscriptions')
export class BotsSubscriptionController {
  constructor(private readonly botsSubscriptionService: BotsSubscriptionService) {}

  @Post()
  async create(@Body() createDto: CreateBotsSubscriptionDto) {
    try {
      const createdSubscription = await this.botsSubscriptionService.create(createDto);
      return {
        message: 'Bots subscription created successfully',
        data: createdSubscription,
      };
    } catch (error) {
      return {
        message: 'Failed to create bots subscription',
        error: error.message,
      };
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
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateBotsSubscriptionDto) {
    try {
      const updatedSubscription = await this.botsSubscriptionService.update(id, updateDto);
      return {
        message: 'Bots subscription updated successfully',
        data: updatedSubscription,
      };
    } catch (error) {
      return {
        message: 'Failed to update bots subscription',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedSubscription = await this.botsSubscriptionService.remove(id);
      return {
        message: 'Bots subscription deleted successfully',
        data: deletedSubscription,
      };
    } catch (error) {
      return {
        message: 'Failed to delete bots subscription',
        error: error.message,
      };
    }
  }
}
