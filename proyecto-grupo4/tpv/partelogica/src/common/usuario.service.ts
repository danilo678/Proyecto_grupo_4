import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existente = await this.usuarioRepository.findOne({
      where: { nombreUsuario: createUsuarioDto.nombreUsuario },
    });
    if (existente) {
      throw new ConflictException(`El nombre de usuario '${createUsuarioDto.nombreUsuario}' ya existe`);
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findByUsername(nombreUsuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { nombreUsuario },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    if (updateUsuarioDto.nombreUsuario) {
      const existente = await this.usuarioRepository.findOne({
        where: { nombreUsuario: updateUsuarioDto.nombreUsuario },
      });
      if (existente && existente.id !== id) {
        throw new ConflictException(`El nombre de usuario '${updateUsuarioDto.nombreUsuario}' ya existe`);
      }
    }

    Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}