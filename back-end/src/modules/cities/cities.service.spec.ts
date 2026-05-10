import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;

  const mockCityModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getModelToken('City'),
          useValue: mockCityModel,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllByStateId', () => {
    it('should return cities by state id', async () => {
      const stateId = '1';
      const cities = [
        {
          id: '1',
          name: 'Porto Alegre',
          stateId: '1',
        },
        {
          id: '2',
          name: 'Caxias do Sul',
          stateId: '1',
        },
      ];
      mockCityModel.find.mockResolvedValue(cities);
      const result = await service.findAllByStateId(stateId);

      expect(mockCityModel.find).toHaveBeenCalledWith({
        stateId,
      });
      expect(mockCityModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        data: cities,
        message: undefined,
      });
    });

    it('should return null when no cities are found', async () => {
      const stateId = '32';
      mockCityModel.find.mockResolvedValue(null);
      const result = await service.findAllByStateId(stateId);

      expect(mockCityModel.find).toHaveBeenCalledWith({
        stateId,
      });
      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Nenhuma cidade encontrada',
      });
    });
  });
});
