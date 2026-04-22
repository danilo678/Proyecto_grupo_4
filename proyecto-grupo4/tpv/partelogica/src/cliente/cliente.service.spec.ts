import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { Contacto } from './entities/contacto/contacto.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

describe('ClienteService', () => {
  let service: ClienteService;

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
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Contacto),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Sucursal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
