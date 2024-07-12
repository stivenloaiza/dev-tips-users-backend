import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, SubscriptionDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { SubscriptionType, UserRole } from 'src/libs/enums';
import { BotsSubscription } from '../bots/entities/bots.entity';
import { TvSuscription } from '../tvs/entities/tv.entity';
import { IframeSuscription } from '../iframes/entities/iframe.entity';
import { CreateBotsSubscriptionDto } from '../bots/dto/create-bots-subscription.dto';
import { CreateTvDto } from '../tvs/dto/create-tv.dto';
import { CreateIframeDto } from '../iframes/dto/create-iframe.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tvsService: TvsService,
    private readonly iframesService: IframesService,
    private readonly botsSubscriptionService: BotsSubscriptionService,
  ) {}

  async create(createUserDto: CreateUserDto, userId: string): Promise<User> {
    try {
      this.validateUserRole(createUserDto.role);
      this.validateSubscriptionType(createUserDto.subscriptions);
      this.validateEmail(createUserDto.email);
      await this.checkEmailExists(createUserDto.email);

      const createdUser = new this.userModel({
        ...createUserDto,
        createdBy: userId,
      });

      const savedUser = await createdUser.save();

      const userIdString = savedUser._id.toString();
      await this.createSubscriptions(userIdString, createUserDto.subscriptions);

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('Error creating user');
      }
    }
  }

  private validateUserRole(role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
      throw new BadRequestException(
        `Invalid role: ${role}. Valid roles are: ${Object.values(UserRole).join(', ')}`,
      );
    }
  }

  validateSubscriptionType(subscriptions: SubscriptionDto[]) {
    for (const subscription of subscriptions) {
      if (
        !subscription.communication ||
        !Object.values(SubscriptionType).includes(subscription.communication)
      ) {
        throw new Error('Invalid subscription type.');
      }
    }
  }

  private async checkEmailExists(email: string) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }
  }

  private validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format.');
    }
  }

  private async createSubscriptions(
    userId: string,
    subscriptions: any[],
  ): Promise<void> {
    for (const subscription of subscriptions) {
      const { type, data } = subscription;

      switch (type) {
        /* case 'email':
                  const emailSubscriptionDto = new CreateEmailSubscriptionDto();
                  emailSubscriptionDto.userId = userId;
                  Object.assign(emailSubscriptionDto, data);
                  const emailSubscription = new this.emailSubscriptionModel(emailSubscriptionDto);
                  await emailSubscription.save();
                  break; */
        case 'bot':
          const botSubscriptionDto = new CreateBotsSubscriptionDto();
          botSubscriptionDto.userId = userId;
          Object.assign(botSubscriptionDto, data);
          await this.botsSubscriptionService.create(botSubscriptionDto);
          break;
        case 'tv':
          const tvSubscriptionDto = new CreateTvDto();
          tvSubscriptionDto.userId = userId;
          Object.assign(tvSubscriptionDto, data);
          await this.tvsService.create(tvSubscriptionDto);
          break;
        case 'iframe':
          const iframeSubscriptionDto = new CreateIframeDto();
          iframeSubscriptionDto.userId = userId;
          Object.assign(iframeSubscriptionDto, data);
          await this.iframesService.create(iframeSubscriptionDto);
          break;
        default:
          throw new BadRequestException(`Unknown subscription type: ${type}`);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    userId: string,
  ): Promise<User> {
    try {
      if (updateUserDto.role) {
        this.validateUserRole(updateUserDto.role);
      }
      if (updateUserDto.subscriptions) {
        this.validateSubscriptionType(updateUserDto.subscriptions);
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          {
            ...updateUserDto,
            updatedBy: userId,
            updatedAt: new Date(),
          },
          { new: true },
        )
        .exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return updatedUser;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new BadRequestException('Error updating user.');
      }
    }
  }

  async remove(id: string, userId: string): Promise<User> {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id, {
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return deletedUser;
  }
}
