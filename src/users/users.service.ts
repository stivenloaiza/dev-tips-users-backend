import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SubscriptionType, UserRole } from 'src/libs/enums';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
      try {
          this.validateUserRole(createUserDto.role);
          this.validateSubscriptionType(createUserDto.subscriptions);

          const createdUser = new this.userModel(createUserDto);
          return await createdUser.save();
      } catch (error) {
          if (error instanceof BadRequestException) {
              throw error;
          } else {
              throw new BadRequestException('Error creating user.');
          }
      }
  }

  private validateUserRole(role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
        throw new BadRequestException(`Invalid role: ${role}. Valid roles are: ${Object.values(UserRole).join(', ')}`);
    }
}

private validateSubscriptionType(subscriptionType: SubscriptionType) {
    if (!Object.values(SubscriptionType).includes(subscriptionType)) {
        throw new BadRequestException(`Invalid subscription type: ${subscriptionType}. Valid types are: ${Object.values(SubscriptionType).join(', ')}`);
    }
}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
      try {
          if (updateUserDto.role) {
              this.validateUserRole(updateUserDto.role);
          }
          if (updateUserDto.subscriptions) {
              this.validateSubscriptionType(updateUserDto.subscriptions);
          }

          const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
          if (!updatedUser) {
              throw new NotFoundException(`User with id ${id} not found`);
          }
          return updatedUser;
      } catch (error) {
          if (error instanceof BadRequestException || error instanceof NotFoundException) {
              throw error; 
          } else {
              throw new BadRequestException('Error updating user.');
          }
      }
  }

    async remove(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return deletedUser;
    }
}
