import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SucursalService } from './sucursal.service';
import { Sucursal } from './entities/sucursal.entity';

describe('SucursalService', () => {
  let service: SucursalService;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SucursalService,
        {
          provide: getRepositoryToken(Sucursal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SucursalService>(SucursalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
