import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './entities/empleado.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { NotFoundException } from '@nestjs/common';

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let empleadoRepo: Repository<Empleado>;
  let sucursalRepo: Repository<Sucursal>;

  const mockEmpleadoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockSucursalRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoService,
        {
          provide: getRepositoryToken(Empleado),
          useValue: mockEmpleadoRepository,
        },
        {
          provide: getRepositoryToken(Sucursal),
          useValue: mockSucursalRepository,
        },
      ],
    }).compile();

    service = module.get<EmpleadoService>(EmpleadoService);
    empleadoRepo = module.get<Repository<Empleado>>(getRepositoryToken(Empleado));
    sucursalRepo = module.get<Repository<Sucursal>>(getRepositoryToken(Sucursal));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear un empleado exitosamente', async () => {
      const dto = { nombre: 'Juan', cargo: 'Chofer', sucursalId: 1 };
      mockSucursalRepository.findOne.mockResolvedValue({ id: 1 });
      mockEmpleadoRepository.create.mockReturnValue(dto);
      mockEmpleadoRepository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto as any);
      expect(result.id).toBe(1);
      expect(mockEmpleadoRepository.save).toHaveBeenCalled();
    });

    it('debe lanzar NotFoundException si la sucursal no existe', async () => {
      mockSucursalRepository.findOne.mockResolvedValue(null);
      await expect(service.create({ sucursalId: 999 } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de empleados', async () => {
      mockEmpleadoRepository.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('debe retornar un empleado si existe', async () => {
      mockEmpleadoRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockEmpleadoRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un empleado', async () => {
      const empleado = { id: 1, nombre: 'Juan' };
      mockEmpleadoRepository.findOne.mockResolvedValue(empleado);
      mockEmpleadoRepository.save.mockResolvedValue({ ...empleado, nombre: 'Pedro' });

      const result = await service.update(1, { nombre: 'Pedro' } as any);
      expect(result.nombre).toBe('Pedro');
    });
  });

  describe('remove', () => {
    it('debe eliminar un empleado', async () => {
      mockEmpleadoRepository.findOne.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockEmpleadoRepository.remove).toHaveBeenCalled();
    });
  });
});
