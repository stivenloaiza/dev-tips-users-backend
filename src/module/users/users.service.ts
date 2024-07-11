import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(CreateUserDto: any) {
    try {
      const { email } = CreateUserDto;

      const validation = await this.userModel.findOne({
        where: { email: email },
      });

      if (!validation) {
        const user = await this.userModel.create(CreateUserDto);

        return user.save();
      } else {
        throw new Error(`The user with the email ${validation} already exists`);
      }
    } catch (error) {
      console.error(`There is a problem in the user creation ${error}`);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
