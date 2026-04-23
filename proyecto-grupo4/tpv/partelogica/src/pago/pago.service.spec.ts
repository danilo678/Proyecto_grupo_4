import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagoService } from './pago.service';
import { Pago } from './entities/pago.entity';
import { Envio } from '../envio/entities/envio.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('PagoService', () => {
  let service: PagoService;
  let pagoRepo: Repository<Pago>;
  let envioRepo: Repository<Envio>;

  const mockPagoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockEnvioRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagoService,
        { provide: getRepositoryToken(Pago), useValue: mockPagoRepo },
        { provide: getRepositoryToken(Envio), useValue: mockEnvioRepo },
      ],
    }).compile();

    service = module.get<PagoService>(PagoService);
    pagoRepo = module.get<Repository<Pago>>(getRepositoryToken(Pago));
    envioRepo = module.get<Repository<Envio>>(getRepositoryToken(Envio));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = { envioId: 1, monto: 100, metodo: 'Efectivo' };

    it('debe registrar un pago exitosamente', async () => {
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });
      mockPagoRepo.findOne.mockResolvedValue(null);
      mockPagoRepo.create.mockReturnValue(dto);
      mockPagoRepo.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result.id).toBe(1);
      expect(mockPagoRepo.save).toHaveBeenCalled();
    });

    it('debe lanzar NotFoundException si el envío no existe', async () => {
      mockEnvioRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException si ya existe un pago igual', async () => {
      mockEnvioRepo.findOne.mockResolvedValue({ id: 1 });
      mockPagoRepo.findOne.mockResolvedValue({ id: 1, ...dto });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('debe lanzar ConflictException si el pago tiene factura', async () => {
      mockPagoRepo.findOne.mockResolvedValue({ id: 1, factura: { id: 1 } });
      await expect(service.remove(1)).rejects.toThrow(ConflictException);
    });

    it('debe eliminar el pago si no tiene factura', async () => {
      const pago = { id: 1, factura: null };
      mockPagoRepo.findOne.mockResolvedValue(pago);
      mockPagoRepo.remove.mockResolvedValue(pago);

      await service.remove(1);
      expect(mockPagoRepo.remove).toHaveBeenCalledWith(pago);
    });
  });
});
