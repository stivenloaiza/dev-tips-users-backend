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
import { Model, Types } from 'mongoose';
import { UpdateEmailDto } from './dto/update-email.dto';

describe('EmailService', () => {
  let service: EmailService;
  let emailModel: Model<EmailSubscription>;
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

  describe('findOneByField', () => {
    it('should find an email subscription by field', async () => {
      const field = 'type';
      const value = 'email';

      const foundEmailSubscription = [
        {
          _id: 'id',
          apikey: 'generatedApiKey',
          userId: 'userId',
          type: 'email',
          frequency: 'weekly',
          level: seniorityType.JUNIOR,
          technology: devLanguageType.JAVASCRIPT,
          lang: languageType.SPANISH,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(emailModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(foundEmailSubscription),
      } as any);

      const result = await service.findOneByField(field, value);
      expect(result).toEqual(foundEmailSubscription);
    });

    it('should return an empty array if no email subscription is found', async () => {
      const field = 'type';
      const value = 'email';

      jest.spyOn(emailModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.findOneByField(field, value);
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update an email subscription', async () => {
      const id = new Types.ObjectId().toHexString();
      const updateEmailDto: UpdateEmailDto = {
        frequency: 'daily',
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.SPANISH,
        type: 'updatedType',
      };

      const updatedEmailSubscription = {
        _id: id,
        ...updateEmailDto,
      };

      jest
        .spyOn(emailModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedEmailSubscription as any);

      const result = await service.update(id, updateEmailDto);
      expect(result).toEqual(updatedEmailSubscription);
      expect(emailModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateEmailDto,
        { new: true },
      );
    });

    it('should throw an error if id is not valid', async () => {
      const invalidId = 'invalidObjectId';
      const updateEmailDto: UpdateEmailDto = {
        frequency: 'daily',
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.SPANISH,
        type: 'updatedType',
      };

      await expect(
        service.update(invalidId, updateEmailDto),
      ).rejects.toThrowError(`Object id ${invalidId} isn't valid`);
    });

    it('should throw an error if update fails', async () => {
      const id = new Types.ObjectId().toHexString();
      const updateEmailDto: UpdateEmailDto = {
        frequency: 'daily',
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.SPANISH,
        type: 'updatedType',
      };

      jest.spyOn(emailModel, 'findByIdAndUpdate').mockResolvedValue(null);

      await expect(service.update(id, updateEmailDto)).rejects.toThrowError(
        'Problem with the updating process',
      );
    });
  });
});
