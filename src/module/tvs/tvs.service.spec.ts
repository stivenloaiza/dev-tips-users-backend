import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TvsService } from './tvs.service';
import { TvSuscription } from './entities/tv.entity';
import { Model } from 'mongoose';
import { ApiService } from '../../libs/auth/auth.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { devLanguageType, languageType, seniorityType, SubscriptionType } from '../../libs/enums';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('TvsService', () => {
    let service: TvsService;
    let tvModel: any;  // Usar `any` para el mock
    let userModel: Model<User>;
    let apiService: ApiService;

    beforeEach(async () => {
        const mockTvModel = {
            create: jest.fn().mockImplementation(dto => Promise.resolve(dto)),
            find: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            countDocuments: jest.fn(),
            findById: jest.fn().mockReturnThis(),
        };

        const mockUserModel = {};

        const mockApiService = {
            getApiKey: jest.fn().mockResolvedValue('test-api-key'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TvsService,
                { provide: getModelToken(TvSuscription.name), useValue: mockTvModel },
                { provide: getModelToken(User.name), useValue: mockUserModel },
                { provide: ApiService, useValue: mockApiService },
            ],
        }).compile();

        service = module.get<TvsService>(TvsService);
        tvModel = module.get<Model<TvSuscription>>(getModelToken(TvSuscription.name));
        userModel = module.get<Model<User>>(getModelToken(User.name));
        apiService = module.get<ApiService>(ApiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('create should create a tv subscription', async () => {
            const createTvDto: CreateTvDto = {
                userId: 'user-id',
                type: 'type',
                level: seniorityType.JUNIOR,
                technology: devLanguageType.JAVASCRIPT,
                lang: languageType.SPANISH,
                apikey: '',
            };

            const result = await service.create(createTvDto);

            expect(apiService.getApiKey).toHaveBeenCalledWith(SubscriptionType.tv);
            expect(tvModel.create).toHaveBeenCalledWith({
                ...createTvDto,
                apikey: 'test-api-key',
            });
            expect(result).toEqual({
                ...createTvDto,
                apikey: 'test-api-key',
            });
        });
    });

    describe('findAll', () => {
        it('findAll should return paginated tv subscriptions', async () => {
            const mockItems = [
                { userId: 'user-id-1', type: 'type-1', level: seniorityType.JUNIOR, technology: devLanguageType.JAVASCRIPT, lang: languageType.SPANISH },
                { userId: 'user-id-2', type: 'type-2', level: seniorityType.SENIOR, technology: devLanguageType.PYTHON, lang: languageType.ENGLISH },
            ];

            tvModel.find = jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue({
                        populate: jest.fn().mockReturnValue({
                            exec: jest.fn().mockResolvedValue(mockItems),
                        }),
                    }),
                }),
            });

            tvModel.countDocuments = jest.fn().mockResolvedValue(10);

            const page = 1;
            const limit = 10;

            const result = await service.findAll(page, limit);

            expect(tvModel.find).toHaveBeenCalled();
            expect(tvModel.find().skip).toHaveBeenCalledWith((page - 1) * limit);
            expect(tvModel.find().skip().limit).toHaveBeenCalledWith(limit);
            expect(tvModel.find().skip().limit().populate).toHaveBeenCalledWith({
                path: 'userId',
                select: 'name email phone role managerName managerEmail managerPhone',
            });
            expect(tvModel.find().skip().limit().populate().exec).toHaveBeenCalled();
            expect(tvModel.countDocuments).toHaveBeenCalled();
            expect(result).toEqual({
                items: mockItems,
                totalItems: 10,
                totalPages: 1,
                currentPage: page,
            });
        });
    });

    describe('findOne', () => {
        it('findOne should return a tv subscription if it exists', async () => {
            const id = 'some-id';
            const mockTv = {
                userId: 'user-id-1',
                type: 'type-1',
                level: seniorityType.JUNIOR,
                technology: devLanguageType.JAVASCRIPT,
                lang: languageType.SPANISH,
            };

            tvModel.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(mockTv),
                }),
            });

            const result = await service.findOne(id);

            expect(tvModel.findById).toHaveBeenCalledWith(id);
            expect(tvModel.findById().populate).toHaveBeenCalledWith('userId');
            expect(tvModel.findById().populate().exec).toHaveBeenCalled();
            expect(result).toEqual(mockTv);
        });

        it('findOne should throw a NotFoundException if the tv subscription does not exist', async () => {
            const id = 'some-id';

            tvModel.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });

            await expect(service.findOne(id)).rejects.toThrow(
                new NotFoundException(`Tv Suscription with id ${id} not found`)
            );
        });
    });
});
