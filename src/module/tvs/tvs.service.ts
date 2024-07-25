import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { TvSuscription } from '../tvs/entities/tv.entity';
import { ApiService } from '../../libs/auth/auth.service';
import { SubscriptionType } from '../../libs/enums';

@Injectable()
export class TvsService {
  constructor(
    @InjectModel(TvSuscription.name)
    private readonly tvModel: Model<TvSuscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly apiService: ApiService,
  ) {}

  async create(createTvDto: CreateTvDto): Promise<TvSuscription> {
    const apiKey = await this.apiService.getApiKey(SubscriptionType.tv);
    createTvDto.apikey = apiKey;
    const createdTvSubscription = await this.tvModel.create(createTvDto);
    return createdTvSubscription;
  }

  async findAll(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    const items = await this.tvModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'userId',
        select: 'name email phone role managerName managerEmail managerPhone',
      })
      .exec();

    const totalItems = await this.tvModel.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<TvSuscription> {
    const tv = await this.tvModel.findById(id).populate('userId').exec();
    if (!tv) {
      throw new NotFoundException(`Tv Suscription with id ${id} not found`);
    }
    return tv;
  }

  async findTvByApikey(apikey: string): Promise<TvSuscription> {
    const tv = await this.tvModel
      .findOne({ apikey })
      .populate({
        path: 'userId',
        select: 'name',
      })
      .exec();

    if (!tv) {
      throw new NotFoundException(
        `The tv suscription with the apikey: ${apikey} wasn't found`,
      );
    }

    if (tv.deletedAt !== null) {
      throw new NotFoundException(
        `The tv suscription with the apikey: ${apikey} is already deleted`,
      );
    }

    return tv;
  }

  async update(id: string, updateTvDto: UpdateTvDto): Promise<TvSuscription> {
    const tv = await this.tvModel.findById(id).exec();
    if (!tv) {
      throw new NotFoundException(`Tv suscription with id ${id} not found`);
    }

    if (updateTvDto.userId) {
      const user = await this.userModel.findById(updateTvDto.userId).exec();
      if (!user) {
        throw new NotFoundException(
          `User with id ${updateTvDto.userId} not found`,
        );
      }
    }

    Object.assign(tv, updateTvDto);
    return await tv.save();
  }
}
