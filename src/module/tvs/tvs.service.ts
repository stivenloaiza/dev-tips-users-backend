import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { TvSuscription } from './entities/tv.entity';

@Injectable()
export class TvsService {
  constructor(
    @InjectModel(TvSuscription.name)
    private readonly tvModel: Model<TvSuscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createTvDto: CreateTvDto): Promise<TvSuscription> {
    const user = await this.userModel.findById(createTvDto.userId).exec();
    if (!user) {
      throw new NotFoundException(
        `User with id ${createTvDto.userId} not found`,
      );
    }

    const createdTv = new this.tvModel(createTvDto);
    return await createdTv.save();
  }

  async findAll(): Promise<TvSuscription[]> {
    return this.tvModel.find().populate('userId').exec();
  }

  async findOne(id: string): Promise<TvSuscription> {
    const tv = await this.tvModel.findById(id).populate('userId').exec();
    if (!tv) {
      throw new NotFoundException(`Tv Suscription with id ${id} not found`);
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

  async remove(id: string): Promise<TvSuscription> {
    const tv = await this.tvModel.findByIdAndDelete(id).exec();
    if (!tv) {
      throw new NotFoundException(`Tv suscription with id ${id} not found`);
    }
    return tv;
  }
}
