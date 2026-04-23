import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  const mockUsuarioRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear un usuario exitosamente', async () => {
      const dto = { nombreUsuario: 'test', password: '123', email: 'a@a.com', rol: 'ADMIN' };
      mockUsuarioRepository.findOne.mockResolvedValue(null);
      mockUsuarioRepository.create.mockReturnValue(dto);
      mockUsuarioRepository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(mockUsuarioRepository.save).toHaveBeenCalled();
    });

    it('debe lanzar ConflictException si el usuario ya existe', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue({ id: 1 });
      await expect(service.create({ nombreUsuario: 'test' } as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar una lista de usuarios', async () => {
      mockUsuarioRepository.find.mockResolvedValue([{ id: 1 }]);
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('debe retornar un usuario si existe', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1 });
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un usuario exitosamente', async () => {
      const usuario = { id: 1, nombreUsuario: 'old' };
      mockUsuarioRepository.findOne.mockResolvedValueOnce(usuario).mockResolvedValueOnce(null);
      mockUsuarioRepository.save.mockResolvedValue({ ...usuario, nombreUsuario: 'new' });

      const result = await service.update(1, { nombreUsuario: 'new' });
      expect(result.nombreUsuario).toBe('new');
    });
  });

  describe('remove', () => {
    it('debe eliminar un usuario', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockUsuarioRepository.remove).toHaveBeenCalled();
    });
  });
});
