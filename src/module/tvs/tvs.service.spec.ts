import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TvsService } from './tvs.service';
import { TvSuscription } from './entities/tv.entity';
import { Model } from 'mongoose';
import { ApiService } from '../../libs/auth/auth.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { devLanguageType, languageType, seniorityType, SubscriptionType } from '../../libs/enums';
import { User } from '../users/entities/user.entity'; // Importa tu entidad User

describe('TvsService', () => {
    let service: TvsService;
    let tvModel: Model<TvSuscription>;
    let userModel: Model<User>;
    let apiService: ApiService;

    beforeEach(async () => {
        const mockTvModel = {
            create: jest.fn().mockImplementation(dto => Promise.resolve(dto)),
        };

        const mockUserModel = {}; // Agrega aquí cualquier método que necesites mockear de UserModel

        const mockApiService = {
            getApiKey: jest.fn().mockResolvedValue('test-api-key'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TvsService,
                { provide: getModelToken(TvSuscription.name), useValue: mockTvModel },
                { provide: getModelToken(User.name), useValue: mockUserModel }, // Agrega el mock de UserModel
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

    it('create should create a tv subscription', async () => {
        const createTvDto: CreateTvDto = {
            userId: 'user-id',
            type: 'type',
            level: seniorityType.JUNIOR,
            technology: devLanguageType.JAVASCRIPT,
            lang: languageType.SPANISH,
            apikey: '', // La clave se añadirá en el servicio
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
