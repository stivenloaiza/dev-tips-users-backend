import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotsSubscription } from '../entities/bots.entity';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';
import {
  BotsSubscriptionNotFoundException,
  BotsSubscriptionBadRequestException,
} from '../exception/bots-suscription.exceptions';
import { ApiService } from '../../../libs/auth/auth.service';
import { SubscriptionType } from '../../../libs/enums/index';

@Injectable()
export class BotsSubscriptionService {
  constructor(
    @InjectModel(BotsSubscription.name)
    private readonly botsSubscriptionModel: Model<BotsSubscription>,
    private readonly apiService: ApiService,
  ) {}

  async create(
    createBotsSubscriptionDto: CreateBotsSubscriptionDto,
  ): Promise<BotsSubscription> {
    try {
      const apiKey = await this.apiService.getApiKey(SubscriptionType.bot);
      createBotsSubscriptionDto.apikey = apiKey;

      const createdBotSubscription = await this.botsSubscriptionModel.create(
        createBotsSubscriptionDto,
      );
      return createdBotSubscription;
    } catch (error) {
      console.error('ISSUE GETTING THE APIKEY WITH BOT', error);
      throw new BotsSubscriptionBadRequestException();
    }
  }

  async findAll(page: number, limit: number): Promise<any> {
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

  async findBotsByApikey(apikey: string): Promise<BotsSubscription> {
    const bot = await this.botsSubscriptionModel.findOne({ apikey }).exec();

    if (!bot) {
      throw new NotFoundException(
        `The bot suscription with the apikey: ${apikey} wasn't found`,
      );
    }
    if (bot.deletedAt !== null) {
      throw new NotFoundException(
        `The bot suscription with the apikey: ${apikey} is already deleted`,
      );
    }

    return bot;
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
