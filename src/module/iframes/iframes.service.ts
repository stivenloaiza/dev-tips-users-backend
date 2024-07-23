import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';
import { IframeSuscription } from './entities/iframe.entity';
import { User } from '../users/entities/user.entity';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/libs/auth/auth.service';
import { SubscriptionType } from 'src/libs/enums';

@Injectable()
export class IframesService {
  HttpService: any;
  constructor(
    @InjectModel(IframeSuscription.name)
    private readonly iframeModel: Model<IframeSuscription>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly httpService: HttpService,
    private readonly apiService: ApiService,
  ) {}

  async create(createIframeDto: CreateIframeDto){
    const apiKey = await this.apiService.getApiKey(SubscriptionType.iframe);
    createIframeDto.apikey = apiKey;
    
    const createdIframeSubscription = new this.iframeModel(createIframeDto);
    createdIframeSubscription.save();

    const { apikey } = createdIframeSubscription;
    const getIframe = {
      apikey: apikey,
    };
    const iframeResponse = await lastValueFrom(
      this.httpService.post(
        `${process.env.ROUTE_BACKEND_IFRAME}/${process.env.getIframe}`,
        getIframe,
      ),
    );
    console.log('Response:', iframeResponse.data);

    await this.iframeModel.findByIdAndUpdate(
      createdIframeSubscription._id,
      { iframe: iframeResponse.data.iframe },
      { new: true },
    );
    const updatedIframeSubscription = await this.iframeModel
      .findById(createdIframeSubscription._id)
      .exec();

      /* try {
        await this.sendIframeToFrontend(updatedIframeSubscription.iframe);
        console.log('Iframe enviado al frontend con éxito');
      } catch (error) {
        console.error('Error al enviar iframe al frontend:', error);
      } */

    return updatedIframeSubscription
  }

  async sendIframeToFrontend(iframe: object): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(`${process.env.ROUTE_FRONTEND_IFRAME}`, {
          iframe: iframe,
        }),
      );
      console.log('Iframe enviado al frontend con éxito:', iframe);
    } catch (error) {
      console.error('Error al enviar iframe al frontend:', error);
      throw new Error(`No se pudo enviar el iframe al frontend ${error.message}`);
    }
  }

  async findAll(page: number, limit: number): Promise<object> {
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

  async findIframeByApikey(apikey: string): Promise<IframeSuscription> {
    const iframe = await this.iframeModel.findOne({ apikey });

    if (!iframe) {
      throw new NotFoundException(
        `The iframe with the apikey: ${apikey} wasn't found`,
      );
    }

    if (iframe.deletedAt !== null) {
      throw new NotFoundException(
        `The iframe with the apikey: ${apikey} is already deleted`,
      );
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
}