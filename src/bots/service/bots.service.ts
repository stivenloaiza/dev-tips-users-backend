import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotsSubscription } from '../entities/bots.entity';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { UpdateBotsSubscriptionDto } from '../dto/update-bots-subscription.dto';

@Injectable()
export class BotsSubscriptionService {
  constructor(
    @InjectModel(BotsSubscription.name) private readonly botsSubscriptionModel: Model<BotsSubscription>,
  ) {}

  async create(createBotsSubscriptionDto: CreateBotsSubscriptionDto): Promise<BotsSubscription> {
    const newBotsSubscription = new this.botsSubscriptionModel(createBotsSubscriptionDto);
    return newBotsSubscription.save();
  }

  async findAll(): Promise<BotsSubscription[]> {
    return this.botsSubscriptionModel.find().exec();
  }

  async findOne(id: string): Promise<BotsSubscription> {
    return this.botsSubscriptionModel.findById(id).exec();
  }

  async update(id: string, updateBotsSubscriptionDto: UpdateBotsSubscriptionDto): Promise<BotsSubscription> {
    return this.botsSubscriptionModel.findByIdAndUpdate(id, updateBotsSubscriptionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<BotsSubscription> {
    return this.botsSubscriptionModel.findByIdAndDelete(id).exec();
  }
}
