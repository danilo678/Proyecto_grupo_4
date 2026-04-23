import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvioService } from './envio.service';
import { Envio } from './entities/envio.entity';
import { Encomienda } from '../encomienda/entities/encomienda.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('EnvioService', () => {
  let service: EnvioService;

  const mockEnvioRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockEncomiendaRepo = {
    findOne: jest.fn(),
  };

  const mockSucursalRepo = {
    findOne: jest.fn(),
  };

  const mockEstadoRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvioService,
        { provide: getRepositoryToken(Envio), useValue: mockEnvioRepo },
        { provide: getRepositoryToken(Encomienda), useValue: mockEncomiendaRepo },
        { provide: getRepositoryToken(Sucursal), useValue: mockSucursalRepo },
        { provide: getRepositoryToken(EstadoEnvio), useValue: mockEstadoRepo },
      ],
    }).compile();

    service = module.get<EnvioService>(EnvioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto = {
      encomiendaId: 1,
      sucursalOrigenId: 1,
      sucursalDestinoId: 2,
      costo: 50,
      estadoId: 1,
    };

    it('debe crear un envío exitosamente', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      mockEnvioRepo.findOne.mockResolvedValue(null);
      mockSucursalRepo.findOne
        .mockResolvedValueOnce({ id: 1, nombre: 'Sucursal Central' })
        .mockResolvedValueOnce({ id: 2, nombre: 'Sucursal Norte' });
      mockEstadoRepo.findOne.mockResolvedValue({ id: 1, nombre: 'Registrado' });
      mockEnvioRepo.create.mockReturnValue({ id: 1, ...createDto });
      mockEnvioRepo.save.mockResolvedValue({ id: 1, ...createDto });

      const result = await service.create(createDto);

      expect(result).toEqual({ id: 1, ...createDto });
    });

    it('debe lanzar NotFoundException si encomienda no existe', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException si encomienda ya tiene envío', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });

    it('debe lanzar NotFoundException si sucursal origen no existe', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      mockEnvioRepo.findOne.mockResolvedValue(null);
      mockSucursalRepo.findOne.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar NotFoundException si sucursal destino no existe', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      mockEnvioRepo.findOne.mockResolvedValue(null);
      mockSucursalRepo.findOne
        .mockResolvedValueOnce({ id: 1 })
        .mockResolvedValueOnce(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debe retornar todos los envíos', async () => {
      const envios = [
        { id: 1, costo: 50 },
        { id: 2, costo: 30 },
      ];
      mockEnvioRepo.find.mockResolvedValue(envios);

      const result = await service.findAll();

      expect(result).toEqual(envios);
    });
  });

  describe('findOne', () => {
    it('debe retornar un envío por ID', async () => {
      const envio = { id: 1, costo: 50 };
      mockEnvioRepo.findOne.mockResolvedValue(envio);

      const result = await service.findOne(1);

      expect(result).toEqual(envio);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockEnvioRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe eliminar un envío', async () => {
      const envio = { id: 1, costo: 50 };
      mockEnvioRepo.findOne.mockResolvedValue(envio);
      mockEnvioRepo.remove.mockResolvedValue(envio);

      await service.remove(1);

      expect(mockEnvioRepo.remove).toHaveBeenCalledWith(envio);
    });
  });

  describe('findByEncomienda', () => {
    it('debe retornar envío por ID de encomienda', async () => {
      const envio = { id: 1, encomiendaId: 1 };
      mockEnvioRepo.findOne.mockResolvedValue(envio);

      const result = await service.findByEncomienda(1);

      expect(result).toEqual(envio);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockEnvioRepo.findOne.mockResolvedValue(null);

      await expect(service.findByEncomienda(999)).rejects.toThrow(NotFoundException);
    });
  });
});