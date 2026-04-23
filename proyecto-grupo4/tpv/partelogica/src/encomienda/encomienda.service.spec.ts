import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EncomiendaService } from './encomienda.service';
import { Encomienda } from './entities/encomienda.entity';
import { DetalleEncomienda } from './entities/detalle-encomienda.entity';
import { Seguro } from './entities/seguro.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { TipoPaquete } from '../common/entities/tipo-paquete.entity';
import { NotFoundException } from '@nestjs/common';

describe('EncomiendaService', () => {
  let service: EncomiendaService;
  let encomiendaRepo: Repository<Encomienda>;
  let clienteRepo: Repository<Cliente>;
  let mockDataSource: any;

  const mockEncomiendaRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };

  const mockClienteRepo = {
    findOne: jest.fn(),
  };

  const mockDetalleRepo = {};
  const mockSeguroRepo = {};
  const mockTipoPaqueteRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockDataSource = {
      transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncomiendaService,
        { provide: getRepositoryToken(Encomienda), useValue: mockEncomiendaRepo },
        { provide: getRepositoryToken(DetalleEncomienda), useValue: mockDetalleRepo },
        { provide: getRepositoryToken(Seguro), useValue: mockSeguroRepo },
        { provide: getRepositoryToken(Cliente), useValue: mockClienteRepo },
        { provide: getRepositoryToken(TipoPaquete), useValue: mockTipoPaqueteRepo },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<EncomiendaService>(EncomiendaService);
    encomiendaRepo = module.get<Repository<Encomienda>>(getRepositoryToken(Encomienda));
    clienteRepo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  describe('create', () => {
    const createDto = {
      codigo: 'ENC001',
      remitenteId: 1,
      destinatarioId: 2,
      detalle: { tipoId: 1, cantidad: 1 },
    };

    it('debe crear una encomienda exitosamente', async () => {
      mockClienteRepo.findOne
        .mockResolvedValueOnce({ id: 1 })
        .mockResolvedValueOnce({ id: 2 });
      mockTipoPaqueteRepo.findOne.mockResolvedValue({ id: 1 });
      
      mockDataSource.transaction.mockImplementation(async (cb) => {
        return await cb({
          create: jest.fn().mockReturnValue({ id: 1 }),
          save: jest.fn().mockResolvedValue({ id: 1 }),
          findOne: jest.fn().mockResolvedValue({ id: 1, ...createDto }),
        });
      });

      const result = await service.create(createDto as any);
      expect(result.id).toBe(1);
    });

    it('debe lanzar NotFoundException si remitente no existe', async () => {
      mockClienteRepo.findOne.mockResolvedValue(null);
      await expect(service.create(createDto as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de encomiendas', async () => {
      mockEncomiendaRepo.find.mockResolvedValue([{ id: 1 }]);
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('debe retornar una encomienda si existe', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar exitosamente', async () => {
      const encomienda = { id: 1, remitenteId: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(encomienda as any);
      mockEncomiendaRepo.save.mockResolvedValue({ ...encomienda, descripcion: 'test' });

      const result = await service.update(1, { descripcion: 'test' });
      expect(mockEncomiendaRepo.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('debe eliminar exitosamente', async () => {
      mockEncomiendaRepo.findOne.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockEncomiendaRepo.remove).toHaveBeenCalled();
    });
  });
});
