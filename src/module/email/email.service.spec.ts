import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmailService } from './email.service';
import { EmailSubscription } from './entities/email.entity';
import { User } from '../users/entities/user.entity';
import { ApiService } from '../../libs/auth/auth.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { devLanguageType, languageType, seniorityType, SubscriptionType } from '../../libs/enums/index';
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
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            save: jest.fn().mockResolvedValue({}), // Asegúrate de tener `save` como método mockeado
            exec: jest.fn(),
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
    emailModel = module.get<Model<EmailSubscription>>(getModelToken(EmailSubscription.name));
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

      jest.spyOn(emailModel, 'create').mockResolvedValue(createdEmailSubscription as any);

      const result = await service.create(createEmailDto);
      expect(result).toEqual(createdEmailSubscription);
      expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.email);
      expect(emailModel.create).toHaveBeenCalledWith({ ...createEmailDto, apikey: apiKey });
    });
  });
});
