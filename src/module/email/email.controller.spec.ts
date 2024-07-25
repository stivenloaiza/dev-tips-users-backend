import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailSubscription } from './entities/email.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { devLanguageType, languageType, seniorityType } from '../../libs/enums/index';
import { User } from '../users/entities/user.entity';
import { ApiService } from '../../libs/auth/auth.service';

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
    emailModel = module.get<Model<EmailSubscription>>(getModelToken(EmailSubscription.name));
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

      jest.spyOn(service, 'create').mockResolvedValue(createdEmailSubscription as any);

      const result = await controller.create(createEmailDto);
      expect(result).toEqual(createdEmailSubscription);
      expect(service.create).toHaveBeenCalledWith(createEmailDto);
    });
  });
});
