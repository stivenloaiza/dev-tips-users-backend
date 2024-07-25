import { Test, TestingModule } from '@nestjs/testing';
import { TvsController } from '../tvs/tvs.controller';
import { TvsService } from '../tvs/tvs.service';
import { devLanguageType, languageType, seniorityType } from '../../libs/enums';

describe('TvsController', () => {
    let controller: TvsController;
    let service: TvsService;

    beforeEach(async () => {
        const mockTvsService = {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findTvByApikey: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TvsController],
            providers: [{ provide: TvsService, useValue: mockTvsService }],
        }).compile();

        controller = module.get<TvsController>(TvsController);
        service = module.get<TvsService>(TvsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('create should create a tv subscription', async () => {
        const createTvDto = {
            apikey: 'test-api-key',
            userId: 'user-id',
            type: 'type',
            level: seniorityType.JUNIOR,
            technology: devLanguageType.JAVASCRIPT,
            lang: languageType.SPANISH,
        };
        const result = await controller.create(createTvDto);
        expect(result).toEqual({});
        expect(service.create).toHaveBeenCalledWith(createTvDto);
    });
});
