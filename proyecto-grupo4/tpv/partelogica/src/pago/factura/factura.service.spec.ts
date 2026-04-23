import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaService } from './factura.service';
import { Factura } from './entities/factura.entity';
import { Pago } from '../../pago/entities/pago.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('FacturaService', () => {
  let service: FacturaService;
  let facturaRepo: Repository<Factura>;
  let pagoRepo: Repository<Pago>;

  const mockFacturaRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockPagoRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturaService,
        { provide: getRepositoryToken(Factura), useValue: mockFacturaRepo },
        { provide: getRepositoryToken(Pago), useValue: mockPagoRepo },
      ],
    }).compile();

    service = module.get<FacturaService>(FacturaService);
    facturaRepo = module.get<Repository<Factura>>(getRepositoryToken(Factura));
    pagoRepo = module.get<Repository<Pago>>(getRepositoryToken(Pago));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = { pagoId: 1, numeroFactura: 'FAC-001', nit: '1234567', razonSocial: 'Test S.A.' };

    it('debe generar una factura exitosamente', async () => {
      mockPagoRepo.findOne.mockResolvedValue({ id: 1 });
      mockFacturaRepo.findOne.mockResolvedValue(null);
      mockFacturaRepo.create.mockReturnValue(dto);
      mockFacturaRepo.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result.id).toBe(1);
      expect(mockFacturaRepo.save).toHaveBeenCalled();
    });

    it('debe lanzar NotFoundException si el pago no existe', async () => {
      mockPagoRepo.findOne.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException si el pago ya tiene factura', async () => {
      mockPagoRepo.findOne.mockResolvedValue({ id: 1 });
      mockFacturaRepo.findOne.mockResolvedValue({ id: 1, ...dto });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('debe retornar una factura por ID', async () => {
      const factura = { id: 1, numeroFactura: 'F1' };
      mockFacturaRepo.findOne.mockResolvedValue(factura);

      const result = await service.findOne(1);
      expect(result).toEqual(factura);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockFacturaRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
