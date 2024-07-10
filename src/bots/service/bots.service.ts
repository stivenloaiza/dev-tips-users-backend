import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotsSubscription } from '../entities/bots.entity';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';
import { AuthService } from './auth.service';

@Injectable()
export class BotsSubscriptionService {
  constructor(
    @InjectModel(BotsSubscription.name) private readonly botsSubscriptionModel: Model<BotsSubscription>,
    private readonly authService: AuthService,
  ) {}

  async create(createBotsSubscriptionDto: CreateBotsSubscriptionDto): Promise<BotsSubscription> {
    const apiKey = await this.authService.getBotsApiKey();
    console.log(`API Key obtenida: ${apiKey}`);

    const newBotsSubscription = new this.botsSubscriptionModel(createBotsSubscriptionDto);
    return newBotsSubscription.save();
  }

  async findAll(): Promise<BotsSubscription[]> {
    return this.botsSubscriptionModel.find().exec();
  }

  async findOne(id: string): Promise<BotsSubscription> {
    const botsSubscription = await this.botsSubscriptionModel.findById(id).exec();
    if (!botsSubscription) {
      throw new NotFoundException(`BotsSubscription with ID "${id}" not found`);
    }
    return botsSubscription;
  }

  async update(id: string, updateBotsSubscriptionDto: UpdateBotsSubscriptionDto): Promise<BotsSubscription> {
    const updatedBotsSubscription = await this.botsSubscriptionModel.findByIdAndUpdate(
      id,
      updateBotsSubscriptionDto,
      { new: true },
    ).exec();
    if (!updatedBotsSubscription) {
      throw new NotFoundException(`BotsSubscription with ID "${id}" not found`);
    }
    return updatedBotsSubscription;
  }

  async remove(id: string): Promise<BotsSubscription> {
    const deletedBotsSubscription = await this.botsSubscriptionModel.findByIdAndDelete(id).exec();
    if (!deletedBotsSubscription) {
      throw new NotFoundException(`BotsSubscription with ID "${id}" not found`);
    }
    return deletedBotsSubscription;
  }
}
