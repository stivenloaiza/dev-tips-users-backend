import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscription } from './entities/email.entity';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(EmailSubscription.name)
    private readonly emailModel: Model<EmailSubscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /*  async create(createEmailDto: CreateEmailDto) {
    const { userId, apikey } = createEmailDto;

    const user = await this.userModel.findOne({ _id: createEmailDto.userId });

    if (!user) {
      throw new Error(
        `The user with the ID ${userId} wasn't found please try again`,
      );
    }

    const validation = this.emailModel.findOne({ apikey: apikey });

    if (validation) {
      throw new Error(
        `Already exists a subscription with this ApiKey ${apikey}`,
      );
    }

    const newSub = new this.emailModel({ createEmailDto });

    return newSub.save();
  } */

  async create(createEmailDto: CreateEmailDto): Promise<EmailSubscription> {
    const createdEmailSubscription = new this.emailModel(createEmailDto);
    return createdEmailSubscription.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const items = await this.emailModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'userId',
        select: 'name email phone role managerName managerEmail managerPhone',
      })
      .exec();
    const totalItems = await this.emailModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findOneByField(field: string, value: string) {
    const query = { [field]: value };
    const emailFound = await this.emailModel.find(query).exec();
    return emailFound;
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(`Object id ${id} isn't valid`);
    }

    const email = await this.emailModel.findByIdAndUpdate({
      id,
      updateEmailDto,
    });

    if (!email) {
      throw new Error(`Problem with the updating process`);
    }
    return email;
  }

  async remove(apikey: string) {
    try {
      const subscription = await this.emailModel.findOne({ apikey: apikey });

      const response = await axios.post(
        'http://localhost:3000/user/remove',
        subscription,
      );

      if (response.status === 200) {
        console.log('Response send Sucessfully');
        return response;
      }
    } catch (error) {
      console.error(
        `There is a problem with the user remove by apikey ${error}`,
      );
    }
  }
}
