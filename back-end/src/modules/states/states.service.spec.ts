import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { StatesService } from './states.service';

describe('StatesService', () => {
  let service: StatesService;

  const mockStateModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatesService,
        {
          provide: getModelToken('State'),
          useValue: mockStateModel,
        },
      ],
    }).compile();

    service = module.get<StatesService>(StatesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all states', async () => {
      const states = [
        {
          id: '1',
          name: 'RS - Rio Grande do Sul',
        },
        {
          id: '2',
          name: 'SC - Santa Catarina',
        },
      ];

      mockStateModel.find.mockResolvedValue(states);

      const result = await service.findAll();

      expect(mockStateModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        data: states,
        message: undefined,
      });
    });

    it('should return null when no states are found', async () => {
      mockStateModel.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockStateModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        data: null,
        message: 'Nenhum estado encontrado',
      });
    });
  });
});
