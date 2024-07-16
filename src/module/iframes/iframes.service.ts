import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';
import { IframeSuscription } from './entities/iframe.entity';
import { User } from '../users/entities/user.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IframesService {
  HttpService: any;
  constructor(
    @InjectModel(IframeSuscription.name)
    private readonly iframeModel: Model<IframeSuscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async create(createIframeDto: CreateIframeDto): Promise<void> {
    const createApiKeyParams = {
      type: 'iframe',
      usageCount: 0,
      limit: 100,
    };

    const headers = {
      'x-api-key': 'p5ypxpbidn0200uvh4cz0plx3n2zqy',
    };

    const apiKeyResponse = await lastValueFrom(
      this.httpService.post(
        'http://localhost:4000/key-subscription/new',
        createApiKeyParams,
        { headers },
      ),
    );
    console.log('hola', apiKeyResponse.data);

    if (apiKeyResponse.status !== 201) {
      console.log('hola');
      throw new HttpException(
        'Failed to create API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (apiKeyResponse.data.apiKey === undefined) {
      console.log('hola2');
      throw new HttpException(
        'Failed to create API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const apiKey = apiKeyResponse.data.apiKey;
    console.log('API Key:', apiKey);

    createIframeDto.apikey = apiKey;

    const createdIframeSubscription = new this.iframeModel(createIframeDto);
    createdIframeSubscription.save();

    const { apikey } = createdIframeSubscription;
    const getIframe = {
      apikey: apikey,
    };
    const iframeResponse = await lastValueFrom(
      this.httpService.post(
        'http://localhost:5003/v1/api/iframe/getIframe',
        getIframe,
      ),
    );
    console.log('Response:', iframeResponse.data);
    return;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<object> {
    const skip = (page - 1) * limit;

    const items = await this.iframeModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'userId',
        select:
          'apikey name email phone role managerName managerEmail managerPhone',
      })
      .exec();

    const totalItems = await this.iframeModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<IframeSuscription> {
    const iframe = await this.iframeModel
      .findById(id)
      .populate('userId')
      .exec();
    if (!iframe) {
      throw new NotFoundException(`Iframe with id ${id} not found`);
    }
    return iframe;
  }

  async update(
    id: string,
    updateIframeDto: UpdateIframeDto,
  ): Promise<IframeSuscription> {
    const iframe = await this.iframeModel.findById(id).exec();
    if (!iframe) {
      throw new NotFoundException(`Iframe with id ${id} not found`);
    }

    if (updateIframeDto.userId) {
      const user = await this.userModel.findById(updateIframeDto.userId).exec();
      if (!user) {
        throw new NotFoundException(
          `User with id ${updateIframeDto.userId} not found`,
        );
      }
    }

    Object.assign(iframe, updateIframeDto);
    return await iframe.save();
  }

  async remove(id: string): Promise<IframeSuscription> {
    const iframe = await this.iframeModel.findByIdAndDelete(id).exec();
    if (!iframe) {
      throw new NotFoundException(`Iframe with id ${id} not found`);
    }
    return iframe;
  }
}
