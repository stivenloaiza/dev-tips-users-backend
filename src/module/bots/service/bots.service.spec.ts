import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { BotsSubscriptionBadRequestException } from '../exception/bots-suscription.exceptions';
import { BotsSubscriptionService } from './bots.service';
import { ApiService } from '../../../libs/auth/auth.service';
import { BotsSubscription } from '../entities/bots.entity';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
  SubscriptionType,
} from '../../../libs/enums/index';

describe('BotsSubscriptionService', () => {
  let service: BotsSubscriptionService;
  let botsSubscriptionModel: Model<BotsSubscription>;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotsSubscriptionService,
        {
          provide: getModelToken(BotsSubscription.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            create: jest.fn(),
          },
        },
        {
          provide: ApiService,
          useValue: {
            getApiKey: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BotsSubscriptionService>(BotsSubscriptionService);
    botsSubscriptionModel = module.get<Model<BotsSubscription>>(
      getModelToken(BotsSubscription.name),
    );
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bot subscription successfully', async () => {
      const createBotsSubscriptionDto: CreateBotsSubscriptionDto = {
        apikey: '',
        userId: 'user123',
        type: 'bot',
        frequency: 'weekly',
        channelType: channelType.TELEGRAM,
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.ENGLISH,
        channelId: 'channel123',
      };

      const apiKey = 'generatedApiKey';
      jest.spyOn(apiService, 'getApiKey').mockResolvedValue(apiKey);

      const createdBotSubscription = {
        _id: 'id',
        ...createBotsSubscriptionDto,
        apikey: apiKey,
      };

      jest
        .spyOn(botsSubscriptionModel, 'create')
        .mockResolvedValue(createdBotSubscription as any);

      const result = await service.create(createBotsSubscriptionDto);
      expect(result).toEqual(createdBotSubscription);
      expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.bot);
      expect(botsSubscriptionModel.create).toHaveBeenCalledWith({
        ...createBotsSubscriptionDto,
        apikey: apiKey,
      });
    });

    it('should throw BotsSubscriptionBadRequestException when create fails', async () => {
      const createBotsSubscriptionDto: CreateBotsSubscriptionDto = {
        apikey: '',
        userId: 'user123',
        type: 'bot',
        frequency: 'weekly',
        channelType: channelType.TELEGRAM,
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.ENGLISH,
        channelId: 'channel123',
      };

      const apiKey = 'generatedApiKey';
      jest.spyOn(apiService, 'getApiKey').mockResolvedValue(apiKey);
      jest
        .spyOn(botsSubscriptionModel, 'create')
        .mockRejectedValue(new Error('Failed to create'));

      await expect(service.create(createBotsSubscriptionDto)).rejects.toThrow(
        BotsSubscriptionBadRequestException,
      );

      expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.bot);
      expect(botsSubscriptionModel.create).toHaveBeenCalledWith({
        ...createBotsSubscriptionDto,
        apikey: apiKey,
      });
    });
  });
});
