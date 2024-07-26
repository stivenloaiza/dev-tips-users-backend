import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';
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
import { HttpException } from '@nestjs/common';

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
            find: jest.fn().mockReturnThis(),
            countDocuments: jest.fn(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn(),
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
    it('should throw HttpException when create fails', async () => {
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
        HttpException,
      );

      expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.bot);
      expect(botsSubscriptionModel.create).toHaveBeenCalledWith({
        ...createBotsSubscriptionDto,
        apikey: apiKey,
      });
    });
  });

  describe('findAll', () => {
    it('should return all bot subscriptions with pagination', async () => {
      const bots = [{ apikey: 'apikey1' }, { apikey: 'apikey2' }];
      const execMock = jest.fn().mockResolvedValue(bots);
      const populateMock = jest.fn().mockReturnValue({ exec: execMock });
      const limitMock = jest.fn().mockReturnValue({ populate: populateMock });
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock });
      jest
        .spyOn(botsSubscriptionModel, 'find')
        .mockReturnValue({ skip: skipMock } as any);
      jest.spyOn(botsSubscriptionModel, 'countDocuments').mockResolvedValue(2);

      const result = await service.findAll(1, 2);
      expect(result).toEqual({
        bots,
        totalBots: 2,
        totalPages: 1,
        currentPage: 1,
      });

      expect(botsSubscriptionModel.find).toHaveBeenCalled();
      expect(botsSubscriptionModel.countDocuments).toHaveBeenCalled();
    });

    it('should return an empty list if no bots are found', async () => {
      const bots = [];
      const execMock = jest.fn().mockResolvedValue(bots);
      const populateMock = jest.fn().mockReturnValue({ exec: execMock });
      const limitMock = jest.fn().mockReturnValue({ populate: populateMock });
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock });
      jest
        .spyOn(botsSubscriptionModel, 'find')
        .mockReturnValue({ skip: skipMock } as any);
      jest.spyOn(botsSubscriptionModel, 'countDocuments').mockResolvedValue(0);

      const result = await service.findAll(1, 2);
      expect(result).toEqual({
        bots,
        totalBots: 0,
        totalPages: 0,
        currentPage: 1,
      });

      expect(botsSubscriptionModel.find).toHaveBeenCalled();
      expect(botsSubscriptionModel.countDocuments).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      const execMock = jest.fn().mockRejectedValue(new Error('Error'));
      const populateMock = jest.fn().mockReturnValue({ exec: execMock });
      const limitMock = jest.fn().mockReturnValue({ populate: populateMock });
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock });
      jest
        .spyOn(botsSubscriptionModel, 'find')
        .mockReturnValue({ skip: skipMock } as any);
      jest.spyOn(botsSubscriptionModel, 'countDocuments').mockResolvedValue(0);

      await expect(service.findAll(1, 2)).rejects.toThrow('Error');
      expect(botsSubscriptionModel.find).toHaveBeenCalled();
    });
  });
});
