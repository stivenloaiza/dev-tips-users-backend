import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailSubscription } from './entities/email.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  devLanguageType,
  languageType,
  seniorityType,
} from '../../libs/enums/index';
import { User } from '../users/entities/user.entity';
import { ApiService } from '../../libs/auth/auth.service';
import { UpdateEmailDto } from './dto/update-email.dto';

describe('EmailController', () => {
  let controller: EmailController;
  let service: EmailService;
  let emailModel: Model<EmailSubscription>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        EmailService,
        {
          provide: getModelToken(EmailSubscription.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
            exec: jest.fn(),
            countDocuments: jest.fn(),
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

    controller = module.get<EmailController>(EmailController);
    service = module.get<EmailService>(EmailService);
    emailModel = module.get<Model<EmailSubscription>>(
      getModelToken(EmailSubscription.name),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const createdEmailSubscription = {
        _id: 'id',
        apikey: 'generatedApiKey',
        userId: 'userId',
        type: 'email',
        frequency: 'weekly',
        level: 'junior',
        technology: 'JavaScript',
        lang: 'english',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'creatorId',
        updatedBy: null,
        deletedBy: null,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(createdEmailSubscription as any);

      const result = await controller.create(createEmailDto);
      expect(result).toEqual(createdEmailSubscription);
      expect(service.create).toHaveBeenCalledWith(createEmailDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated email subscriptions', async () => {
      const page = 1;
      const limit = 10;

      const emailSubscriptions = [
        {
          _id: 'id1',
          userId: 'userId1',
          type: 'email',
          frequency: 'weekly',
          level: seniorityType.JUNIOR,
          technology: devLanguageType.JAVASCRIPT,
          lang: languageType.SPANISH,
        },
        {
          _id: 'id2',
          userId: 'userId2',
          type: 'email',
          frequency: 'monthly',
          level: seniorityType.SENIOR,
          technology: devLanguageType.PYTHON,
          lang: languageType.ENGLISH,
        },
      ];

      const result = {
        items: emailSubscriptions,
        totalItems: 20,
        totalPages: 2,
        currentPage: 1,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      const response = await controller.findAll(page, limit);
      expect(response).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(page, limit);
    });
  });

  describe('findOne', () => {
    it('should find an email subscription by field', async () => {
      const field = 'type';
      const value = 'email';
      const emailSubscription = {
        _id: 'id',
        type: 'email',
        frequency: 'weekly',
      };

      jest
        .spyOn(service, 'findOneByField')
        .mockResolvedValue([emailSubscription] as any);

      const result = await controller.findOne(field, value);
      expect(result).toEqual([emailSubscription]);
      expect(service.findOneByField).toHaveBeenCalledWith(field, value);
    });

    it('should return an empty array if no email subscription is found', async () => {
      const field = 'type';
      const value = 'nonexistent';
      jest.spyOn(service, 'findOneByField').mockResolvedValue([] as any);

      const result = await controller.findOne(field, value);
      expect(result).toEqual([]);
      expect(service.findOneByField).toHaveBeenCalledWith(field, value);
    });
  });

  describe('update', () => {
    it('should update an email subscription', async () => {
      const id = 'validObjectId';
      const updateEmailDto: UpdateEmailDto = {
        type: 'updatedType',
        frequency: 'daily',
        level: seniorityType.MID,
        technology: devLanguageType.PYTHON,
        lang: languageType.ENGLISH,
      };

      const updatedEmailSubscription = {
        _id: id,
        ...updateEmailDto,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedEmailSubscription as any);

      const result = await controller.update(id, updateEmailDto);
      expect(result).toEqual(updatedEmailSubscription);
      expect(service.update).toHaveBeenCalledWith(id, updateEmailDto);
    });
  });
});
