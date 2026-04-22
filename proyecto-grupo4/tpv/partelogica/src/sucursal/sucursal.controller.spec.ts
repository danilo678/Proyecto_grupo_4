import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SucursalController } from './sucursal.controller';
import { SucursalService } from './sucursal.service';
import { Sucursal } from './entities/sucursal.entity';

describe('SucursalController', () => {
  let controller: SucursalController;

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
      controllers: [SucursalController],
      providers: [
        SucursalService,
        {
          provide: getRepositoryToken(Sucursal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<SucursalController>(SucursalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
