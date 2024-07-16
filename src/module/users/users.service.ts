import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { SubscriptionType, UserRole } from 'src/libs/enums';
import { CreateBotsSubscriptionDto } from '../bots/dto/create-bots-subscription.dto';
import { CreateTvDto } from '../tvs/dto/create-tv.dto';
import { CreateIframeDto } from '../iframes/dto/create-iframe.dto';
import { TvsService } from '../tvs/tvs.service';
import { IframesService } from '../iframes/iframes.service';
import { BotsSubscriptionService } from '../bots/service/bots.service';
import { EmailService } from '../email/email.service';
import { CreateEmailDto } from '../email/dto/create-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tvsService: TvsService,
    private readonly iframesService: IframesService,
    private readonly botsSubscriptionService: BotsSubscriptionService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: any): Promise<User> {
    try {
      console.log(createUserDto);
      this.validateUserRole(createUserDto.role);
      this.validateSubscriptionType(createUserDto.subscriptions);
      this.validateEmail(createUserDto.email);
      await this.checkEmailExists(createUserDto.email);

      const createdUser = new this.userModel({
        ...createUserDto,
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

  private async createSubscriptions(
    userId: string,
    subscriptions: any[],
  ): Promise<void> {
    console.log('The user id in create', userId);
    try {
      for (const subscription of subscriptions) {
        const { type, ...data } = subscription;
        console.log('DATA');
        let subscriptionCreate: any;

        switch (type) {
          case 'email':
            subscriptionCreate = new CreateEmailDto();

            break;

          case 'bot':
            subscriptionCreate = new CreateBotsSubscriptionDto();
            break;

          case 'tv':
            subscriptionCreate = new CreateTvDto();
            break;

          case 'iframe':
            subscriptionCreate = new CreateIframeDto();

            break;
        }

        Object.assign(subscriptionCreate, data);
        subscriptionCreate.userId = userId;
        console.log('finalSubscription', subscriptionCreate);
        return await this.saveSubscription(type, subscriptionCreate);
      }
    } catch (error) {
      throw new Error(`Error acrossing the subscription array ${error}`);
    }
  }

  private async saveSubscription(type: SubscriptionType, subscription: any) {
    try {
      switch (type) {
        case 'email':
          await this.emailService.create(subscription);
          break;

        case 'bot':
          await this.botsSubscriptionService.create(subscription);
          break;

        case 'tv':
          await this.tvsService.create(subscription);
          break;

        case 'iframe':
          await this.iframesService.create(subscription);

          break;
      }
    } catch (error) {
      throw new Error(`There is a issue saving the subscription ${error}`);
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
      console.log(subscription);

      if (
        !subscription.type ||
        !Object.values(SubscriptionType).includes(subscription.type)
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

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const items = await this.userModel.find().skip(skip).limit(limit).exec();

    const totalUsers = await this.userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      items,
      totalUsers,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(
        `The user with the email: ${email} wasn't found`,
      );
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
