import { Test, TestingModule } from '@nestjs/testing';
import { TvsController } from './tvs.controller';
import { TvsService } from './tvs.service';
import { NotFoundException } from '@nestjs/common';
import { devLanguageType, languageType, seniorityType } from '../../libs/enums';

describe('TvsController', () => {
  let controller: TvsController;
  let service: TvsService;

  beforeEach(async () => {
    const mockTvsService = {
      findOne: jest.fn(),
      findTvByApikey: jest.fn(),
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

      service.findOne = jest.fn().mockResolvedValue(mockTv);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTv);
    });

    it('findOne should throw NotFoundException if the tv subscription does not exist', async () => {
      const id = 'some-id';

      service.findOne = jest
        .fn()
        .mockRejectedValue(
          new NotFoundException(`Tv Suscription with id ${id} not found`),
        );

      await expect(controller.findOne(id)).rejects.toThrow(
        new NotFoundException(`Tv Suscription with id ${id} not found`),
      );
    });
  });

  describe('findOneByApikey', () => {
    it('findOneByApikey should return a tv subscription if it exists and is not deleted', async () => {
      const apikey = 'some-apikey';
      const mockTv = {
        userId: 'user-id-1',
        type: 'type-1',
        level: seniorityType.JUNIOR,
        technology: devLanguageType.JAVASCRIPT,
        lang: languageType.SPANISH,
      };

      service.findTvByApikey = jest.fn().mockResolvedValue(mockTv);

      const result = await controller.findOneByApikey(apikey);

      expect(service.findTvByApikey).toHaveBeenCalledWith(apikey);
      expect(result).toEqual(mockTv);
    });

    it('findOneByApikey should throw NotFoundException if the tv subscription does not exist', async () => {
      const apikey = 'some-apikey';

      service.findTvByApikey = jest
        .fn()
        .mockRejectedValue(
          new NotFoundException(
            `The tv suscription with the apikey: ${apikey} wasn't found`,
          ),
        );

      await expect(controller.findOneByApikey(apikey)).rejects.toThrow(
        new NotFoundException(
          `The TV subscription with the API key: ${apikey} wasn't found or is already deleted`,
        ),
      );
    });

    it('findOneByApikey should throw NotFoundException if the tv subscription is already deleted', async () => {
      const apikey = 'some-apikey';

      service.findTvByApikey = jest
        .fn()
        .mockRejectedValue(
          new NotFoundException(
            `The tv suscription with the apikey: ${apikey} is already deleted`,
          ),
        );

      await expect(controller.findOneByApikey(apikey)).rejects.toThrow(
        new NotFoundException(
          `The TV subscription with the API key: ${apikey} wasn't found or is already deleted`,
        ),
      );
    });
  });
});
