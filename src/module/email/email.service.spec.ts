import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmailService } from './email.service';
import { EmailSubscription } from './entities/email.entity';
import { User } from '../users/entities/user.entity';
import { ApiService } from '../../libs/auth/auth.service';
import { CreateEmailDto } from './dto/create-email.dto';
import {
  devLanguageType,
  languageType,
  seniorityType,
  SubscriptionType,
} from '../../libs/enums/index';
import { Model } from 'mongoose';

describe('EmailService', () => {
  let service: EmailService;
  let emailModel: Model<EmailSubscription>;
  let userModel: Model<User>;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: getModelToken(EmailSubscription.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            create: jest.fn(),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            countDocuments: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(10),
            }),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
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

    service = module.get<EmailService>(EmailService);
    emailModel = module.get<Model<EmailSubscription>>(
      getModelToken(EmailSubscription.name),
    );
    userModel = module.get<Model<User>>(getModelToken(User.name));
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new email subscription', async () => {
      const createEmailDto: CreateEmailDto = {
        apikey: '',
        userId: 'userId',
        type: 'email',
        frequency: 'weekly',
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.SPANISH,
      };

      const apiKey = 'generatedApiKey';
      jest.spyOn(apiService, 'getApiKey').mockResolvedValue(apiKey);

      const createdEmailSubscription = {
        _id: 'id',
        ...createEmailDto,
        apikey: apiKey,
      };

      jest
        .spyOn(emailModel, 'create')
        .mockResolvedValue(createdEmailSubscription as any);

      const result = await service.create(createEmailDto);
      expect(result).toEqual(createdEmailSubscription);
      expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.email);
      expect(emailModel.create).toHaveBeenCalledWith({
        ...createEmailDto,
        apikey: apiKey,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated email subscriptions', async () => {
      const page = 1;
      const limit = 10;

      const items = [
        {
          _id: '1',
          apikey: 'key1',
          userId: 'user1',
          type: 'type1',
          frequency: 'weekly',
          level: seniorityType.JUNIOR,
          technology: devLanguageType.JAVASCRIPT,
          lang: languageType.ENGLISH,
        },
      ];

      jest.spyOn(emailModel, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(items),
      } as any);

      jest.spyOn(emailModel, 'countDocuments').mockReturnValue({
        exec: jest.fn().mockResolvedValue(10),
      } as any);

      const result = await service.findAll(page, limit);

      expect(result).toEqual({
        items,
        totalItems: 10,
        totalPages: Math.ceil(10 / limit),
        currentPage: page,
      });

      const findMock = emailModel.find as jest.Mock;
      expect(findMock().skip).toHaveBeenCalledWith((page - 1) * limit);
      expect(findMock().limit).toHaveBeenCalledWith(limit);
      expect(findMock().populate).toHaveBeenCalledWith({
        path: 'userId',
        select: 'name email phone role managerName managerEmail managerPhone',
      });
      expect(emailModel.countDocuments).toHaveBeenCalled();
    });
  });
});
