import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeguimientoService } from './seguimiento.service';
import { Seguimiento } from './entities/seguimiento.entity';
import { Entrega } from './entities/entrega.entity';
import { Envio } from '../envio/entities/envio.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('SeguimientoService', () => {
  let service: SeguimientoService;
  let seguimientoRepo: Repository<Seguimiento>;
  let envioRepo: Repository<Envio>;
  let estadoRepo: Repository<EstadoEnvio>;

  const mockSeguimientoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockEntregaRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockEnvioRepo = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockEstadoRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeguimientoService,
        { provide: getRepositoryToken(Seguimiento), useValue: mockSeguimientoRepo },
        { provide: getRepositoryToken(Entrega), useValue: mockEntregaRepo },
        { provide: getRepositoryToken(Envio), useValue: mockEnvioRepo },
        { provide: getRepositoryToken(EstadoEnvio), useValue: mockEstadoRepo },
      ],
    }).compile();

    service = module.get<SeguimientoService>(SeguimientoService);
    seguimientoRepo = module.get<Repository<Seguimiento>>(getRepositoryToken(Seguimiento));
    envioRepo = module.get<Repository<Envio>>(getRepositoryToken(Envio));
    estadoRepo = module.get<Repository<EstadoEnvio>>(getRepositoryToken(EstadoEnvio));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe registrar un seguimiento y actualizar el estado del envío', async () => {
      const dto = { envioId: 1, estadoId: 2, ubicacion: 'Almacén Central', observaciones: 'Llegada' };
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });
      mockEstadoRepo.findOne.mockResolvedValue({ id: 2, nombre: 'En Tránsito' });
      mockSeguimientoRepo.create.mockReturnValue(dto);
      mockSeguimientoRepo.save.mockResolvedValue({ id: 10, ...dto });

      const result = await service.create(dto);

      expect(result.id).toBe(10);
      expect(mockEnvioRepo.update).toHaveBeenCalledWith(1, { estadoId: 2 });
    });

    it('debe lanzar NotFoundException si el envío no existe', async () => {
      mockEnvioRepo.findOne.mockResolvedValue(null);
      await expect(service.create({ envioId: 99, estadoId: 1 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('createEntrega', () => {
    it('debe registrar una entrega exitosamente', async () => {
      const dto = { envioId: 1, nombreRecibe: 'Juan Perez', ciRecibe: '123456', fechaEntrega: new Date() };
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });
      mockEntregaRepo.findOne.mockResolvedValue(null);
      mockEstadoRepo.findOne.mockResolvedValue({ id: 5, nombre: 'Entregado' });
      mockEntregaRepo.create.mockReturnValue(dto);
      mockEntregaRepo.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.createEntrega(dto);

      expect(result.id).toBe(1);
      expect(mockEnvioRepo.update).toHaveBeenCalled();
    });

    it('debe lanzar ConflictException si ya existe una entrega', async () => {
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });
      mockEntregaRepo.findOne.mockResolvedValue({ id: 1 });

      await expect(service.createEntrega({ envioId: 1, nombreRecibe: 'A', ciRecibe: 'B' })).rejects.toThrow(ConflictException);
    });
  });
});
