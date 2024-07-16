import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotsSubscription } from '../entities/bots.entity';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';
import {
  BotsSubscriptionNotFoundException,
  BotsSubscriptionBadRequestException,
} from '../exception/bots-suscription.exceptions';
import { AuthService } from './auth.service';

@Injectable()
export class BotsSubscriptionService {
  constructor(
    @InjectModel(BotsSubscription.name)
    private readonly botsSubscriptionModel: Model<BotsSubscription>,
    private readonly authService: AuthService,
  ) {}

  async create(
    createBotsSubscriptionDto: CreateBotsSubscriptionDto,
  ): Promise<BotsSubscription> {
    const apiKey = await this.authService.createBotsApiKey('bots', 0, 100);
    createBotsSubscriptionDto.apiKey = apiKey;

    const createdBotSubscription = new this.botsSubscriptionModel(
      createBotsSubscriptionDto,
    );
    return createdBotSubscription.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const bots = await this.botsSubscriptionModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'userId',
        select: 'name email phone role managerName managerEmail managerPhone',
      })
      .exec();

    const totalBots = await this.botsSubscriptionModel.countDocuments();
    const totalPages = Math.ceil(totalBots / limit);

    return {
      bots,
      totalBots,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<BotsSubscription> {
    try {
      const botsSubscription = await this.botsSubscriptionModel
        .findById(id)
        .exec();
      if (!botsSubscription) {
        throw new BotsSubscriptionNotFoundException(
          `BotsSubscription with ID "${id}" not found`,
        );
      }
      return botsSubscription;
    } catch (error) {
      throw new BotsSubscriptionNotFoundException(
        `BotsSubscription with ID "${id}" not found`,
      );
    }
  }

  async update(
    id: string,
    updateBotsSubscriptionDto: UpdateBotsSubscriptionDto,
  ): Promise<BotsSubscription> {
    try {
      const updatedBotsSubscription = await this.botsSubscriptionModel
        .findByIdAndUpdate(id, updateBotsSubscriptionDto, { new: true })
        .exec();
      if (!updatedBotsSubscription) {
        throw new BotsSubscriptionNotFoundException(
          `BotsSubscription with ID "${id}" not found`,
        );
      }
      return updatedBotsSubscription;
    } catch (error) {
      throw new BotsSubscriptionBadRequestException(
        'Failed to update bots subscription',
      );
    }
  }
}
