import { Test, TestingModule } from '@nestjs/testing';
import { CreateBotsSubscriptionDto } from '../dto/create-bots-subscription.dto';
import { BotsSubscriptionController } from './bots.controller';
import { BotsSubscriptionService } from '../service/bots.service';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
} from '../../../libs/enums/index';

describe('BotsController', () => {
  let controller: BotsSubscriptionController;
  let service: BotsSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotsSubscriptionController],
      providers: [
        {
          provide: BotsSubscriptionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BotsSubscriptionController>(
      BotsSubscriptionController,
    );
    service = module.get<BotsSubscriptionService>(BotsSubscriptionService);
  });

  describe('create', () => {
    it('should create a new bots subscription', async () => {
      const createBotsSubscritionDto: CreateBotsSubscriptionDto = {
        apikey: '12345-abcde',
        type: 'bot',
        frequency: 'weekly',
        userId: 'user123',
        channelId: 'channel123',
        channelType: channelType.TELEGRAM,
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.ENGLISH,
      };

      const createdBotsSubscription = {
        apikey: '12345-abcde',
        type: 'bot',
        frequency: 'weekly',
        userId: 'user123',
        channelId: 'channel123',
        channelType: channelType.TELEGRAM,
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.ENGLISH,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'creatorId',
        updatedBy: null,
      };

      const serviceResponse = {
        data: createdBotsSubscription,
        message: 'Bots subscription created successfully',
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(createdBotsSubscription as any);

      const result = await controller.create(createBotsSubscritionDto);
      expect(result).toEqual(serviceResponse);
      expect(service.create).toHaveBeenCalledWith(createBotsSubscritionDto);
    });
  });

  describe('findAll', () => {
    it('should return all bot subscriptions with pagination', async () => {
      const bots = [{ apikey: 'apikey1' }, { apikey: 'apikey2' }];
      const serviceResult = {
        bots,
        totalBots: 2,
        totalPages: 1,
        currentPage: 1,
      };
      const expectedResult = {
        data: serviceResult,
        message: 'List of all bots subscriptions',
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(serviceResult);

      const result = await controller.findAll(1, 2);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(1, 2);
    });

    it('should return an empty list if no bots are found', async () => {
      const serviceResult = {
        bots: [],
        totalBots: 0,
        totalPages: 0,
        currentPage: 1,
      };
      const expectedResult = {
        data: serviceResult,
        message: 'List of all bots subscriptions',
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(serviceResult);

      const result = await controller.findAll(1, 2);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(1, 2);
    });
  });
});
