import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;
  let citiesService: CitiesService;

  const mockCitiesService = {
    findAllByStateId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: mockCitiesService,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    citiesService = module.get<CitiesService>(CitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllByStateId', () => {
    it('should return cities by state id', async () => {
      const stateId = '1';
      const response = {
        success: true,
        data: [
          {
            id: '1',
            name: 'Porto Alegre',
            stateId: '1',
          },
        ],
        message: 'Cidades encontradas com sucesso',
      };
      mockCitiesService.findAllByStateId.mockResolvedValue(response);

      const result = await controller.findAllByStateId(stateId);

      expect(citiesService.findAllByStateId).toHaveBeenCalledWith(stateId);
      expect(citiesService.findAllByStateId).toHaveBeenCalledTimes(1);
      expect(result).toEqual(response);
    });

    it('should return null when no cities are found', async () => {
      const stateId = '999';
      const response = {
        success: true,
        data: null,
        message: 'Nenhuma cidade encontrada',
      };

      mockCitiesService.findAllByStateId.mockResolvedValue(response);
      const result = await controller.findAllByStateId(stateId);

      expect(citiesService.findAllByStateId).toHaveBeenCalledWith(stateId);
      expect(result).toEqual(response);
    });
  });
});
