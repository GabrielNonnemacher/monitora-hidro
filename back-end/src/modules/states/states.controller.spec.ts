import { Test, TestingModule } from '@nestjs/testing';

import { StatesController } from './states.controller';
import { StatesService } from './states.service';

describe('StatesController', () => {
  let controller: StatesController;
  let statesService: StatesService;
  const mockStatesService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatesController],
      providers: [
        {
          provide: StatesService,
          useValue: mockStatesService,
        },
      ],
    }).compile();

    controller = module.get<StatesController>(StatesController);
    statesService = module.get<StatesService>(StatesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all states', async () => {
      const response = {
        success: true,
        data: [
          {
            id: '1',
            name: 'RS - Rio Grande do Sul',
          },
          {
            id: '2',
            name: 'SC - Santa Catarina',
          },
        ],
        message: undefined,
      };

      mockStatesService.findAll.mockResolvedValue(response);

      const result = await controller.findAll();

      expect(statesService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(response);
    });

    it('should return null when no states are found', async () => {
      const response = {
        success: true,
        data: null,
        message: 'Nenhum estado encontrado',
      };

      mockStatesService.findAll.mockResolvedValue(response);

      const result = await controller.findAll();

      expect(statesService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(response);
    });
  });
});
