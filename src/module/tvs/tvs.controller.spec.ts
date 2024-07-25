import { Test, TestingModule } from '@nestjs/testing';
import { TvsController } from './tvs.controller';
import { TvsService } from './tvs.service';
import { TvSuscription } from './entities/tv.entity';
import { ApiService } from '../../libs/auth/auth.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { devLanguageType, languageType, seniorityType, SubscriptionType } from '../../libs/enums';
import { User } from '../users/entities/user.entity';

describe('TvsController', () => {
    let controller: TvsController;
    let service: TvsService;

    beforeEach(async () => {
        const mockTvsService = {
            findAll: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TvsController],
            providers: [
                { provide: TvsService, useValue: mockTvsService },
                { provide: getModelToken(TvSuscription.name), useValue: {} },
                { provide: getModelToken(User.name), useValue: {} },
                { provide: ApiService, useValue: {} },
            ],
        }).compile();

        controller = module.get<TvsController>(TvsController);
        service = module.get<TvsService>(TvsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findAll should return paginated tv subscriptions', async () => {
        const mockItems = [
            { userId: 'user-id-1', type: 'type-1', level: seniorityType.JUNIOR, technology: devLanguageType.JAVASCRIPT, lang: languageType.SPANISH },
            { userId: 'user-id-2', type: 'type-2', level: seniorityType.SENIOR, technology: devLanguageType.PYTHON, lang: languageType.ENGLISH },
        ];

        const page = 1;
        const limit = 10;

        jest.spyOn(service, 'findAll').mockResolvedValue({
            items: mockItems,
            totalItems: 10,
            totalPages: 1,
            currentPage: page,
        });

        const result = await controller.findAll(page, limit);

        expect(service.findAll).toHaveBeenCalledWith(page, limit);
        expect(result).toEqual({
            items: mockItems,
            totalItems: 10,
            totalPages: 1,
            currentPage: page,
        });
    });
});
