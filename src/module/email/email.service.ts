import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscription } from './entities/email.entity';
import { Model, Types } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { SubscriptionType } from 'src/libs/enums';
import { ApiService } from 'src/libs/auth/auth.service';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(EmailSubscription.name)
    private readonly emailModel: Model<EmailSubscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly apiService: ApiService,
  ) {}

  async create(createEmailDto: CreateEmailDto): Promise<EmailSubscription> {
    const apiKey = await this.apiService.getApiKey(SubscriptionType.email);
    createEmailDto.apikey = apiKey;

    const createdEmailSubscription = new this.emailModel(createEmailDto);
    return createdEmailSubscription.save();
  }

  async findAll(page: number, limit: number): Promise<any> {
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

}
