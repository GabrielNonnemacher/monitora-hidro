import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;

  const mockLocationModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getModelToken('LocationPoint'),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByCityId', () => {
    it('should return locations by city id', async () => {
      const cityId = '1';
      const locations = [
        {
          id: '1',
          cityId: '1',
          name: 'Centro',
          default: 1,
          attention: 2,
          flood: 3,
          extreme: 4,
          active: true,
        },
      ];
      mockLocationModel.find.mockResolvedValue(locations);
      const result = await service.findAllByCityId(cityId);

      expect(mockLocationModel.find).toHaveBeenCalledWith({
        cityId,
      });
      expect(mockLocationModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        data: locations,
        message: undefined,
      });
    });

    it('should return null when no locations are found', async () => {
      const cityId = '999';
      mockLocationModel.find.mockResolvedValue([]);
      const result = await service.findAllByCityId(cityId);

      expect(mockLocationModel.find).toHaveBeenCalledWith({
        cityId,
      });
      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Localização não encontrada',
      });
    });
  });
});
