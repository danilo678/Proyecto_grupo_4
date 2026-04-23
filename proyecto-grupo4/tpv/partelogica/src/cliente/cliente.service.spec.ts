import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository, QueryFailedError } from 'typeorm';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { Contacto } from './entities/contacto/contacto.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ClienteService', () => {
  let service: ClienteService;
  let clienteRepo: Repository<Cliente>;
  let contactoRepo: Repository<Contacto>;
  let sucursalRepo: Repository<Sucursal>;

  const mockClienteRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockContactoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockSucursalRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: getRepositoryToken(Cliente), useValue: mockClienteRepo },
        { provide: getRepositoryToken(Contacto), useValue: mockContactoRepo },
        { provide: getRepositoryToken(Sucursal), useValue: mockSucursalRepo },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    clienteRepo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
    contactoRepo = module.get<Repository<Contacto>>(getRepositoryToken(Contacto));
    sucursalRepo = module.get<Repository<Sucursal>>(getRepositoryToken(Sucursal));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto = {
      nombre: 'Juan',
      apellido: 'Perez',
      ci: '123456',
      sucursalIds: [1],
    };

    it('debe crear un cliente con sucursales asociadas', async () => {
      const sucursal = { id: 1, nombre: 'Sucursal Central' };
      mockSucursalRepo.find.mockResolvedValue([sucursal]);
      mockClienteRepo.create.mockReturnValue({ ...createDto });
      mockClienteRepo.save.mockResolvedValue({ id: 1, ...createDto, sucursales: [sucursal] });

      const result = await service.create(createDto);

      expect(result.id).toBe(1);
      expect(mockSucursalRepo.find).toHaveBeenCalled();
      expect(mockClienteRepo.save).toHaveBeenCalled();
    });

    it('debe lanzar ConflictException si el CI ya existe', async () => {
      mockClienteRepo.create.mockReturnValue({ ...createDto });
      const error = new QueryFailedError('', [], { code: '23505' } as any);
      (error as any).code = '23505';
      mockClienteRepo.save.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('debe retornar un cliente si existe', async () => {
      const cliente = { id: 1, nombre: 'Juan' };
      mockClienteRepo.findOne.mockResolvedValue(cliente);

      const result = await service.findOne(1);
      expect(result).toEqual(cliente);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockClienteRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createContacto', () => {
    it('debe crear un contacto para un cliente existente', async () => {
      const contactoDto = { nombre: 'Pedro', telefono: '77711111', tipo: 'Familiar' };
      mockClienteRepo.findOne.mockResolvedValue({ id: 1 });
      mockContactoRepo.create.mockReturnValue({ ...contactoDto, clienteId: 1 });
      mockContactoRepo.save.mockResolvedValue({ id: 10, ...contactoDto, clienteId: 1 });

      const result = await service.createContacto(1, contactoDto);
      expect(result.id).toBe(10);
      expect(mockContactoRepo.save).toHaveBeenCalled();
    });
  });
});
