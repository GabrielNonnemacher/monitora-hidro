import { Test, TestingModule } from '@nestjs/testing';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

describe('LocationsController', () => {
  let controller: LocationsController;
  let locationsService: LocationsService;

  const mockLocationsService = {
    findAllByCityId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: mockLocationsService,
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);

    locationsService = module.get<LocationsService>(LocationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return locations by city id', async () => {
      const cityId = '1';
      const response = {
        success: true,
        data: [
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
        ],
        message: undefined,
      };
      mockLocationsService.findAllByCityId.mockResolvedValue(response);

      const result = await controller.findOne(cityId);
      expect(locationsService.findAllByCityId).toHaveBeenCalledWith(cityId);
      expect(locationsService.findAllByCityId).toHaveBeenCalledTimes(1);
      expect(result).toEqual(response);
    });

    it('should return null when no locations are found', async () => {
      const cityId = '999';
      const response = {
        success: true,
        data: null,
        message: 'Nenhuma localização encontrada',
      };
      mockLocationsService.findAllByCityId.mockResolvedValue(response);

      const result = await controller.findOne(cityId);
      expect(locationsService.findAllByCityId).toHaveBeenCalledWith(cityId);
      expect(result).toEqual(response);
    });
  });
});
