import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeguimientoDto, CreateEntregaDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto, UpdateEntregaDto } from './dto/create-seguimiento.dto';
import { Seguimiento } from './entities/seguimiento.entity';
import { Entrega } from './entities/entrega.entity';
import { Envio } from '../envio/entities/envio.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectRepository(Seguimiento)
    private seguimientoRepository: Repository<Seguimiento>,
    @InjectRepository(Entrega)
    private entregaRepository: Repository<Entrega>,
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    @InjectRepository(EstadoEnvio)
    private estadoEnvioRepository: Repository<EstadoEnvio>,
  ) {}

  async create(createSeguimientoDto: CreateSeguimientoDto): Promise<Seguimiento> {
    const { envioId, estadoId, ...seguimientoData } = createSeguimientoDto;

    const envio = await this.envioRepository.findOne({ where: { id: envioId } });
    if (!envio) {
      throw new NotFoundException(`Envío con ID ${envioId} no encontrado`);
    }

    const estado = await this.estadoEnvioRepository.findOne({ where: { id: estadoId } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${estadoId} no encontrado`);
    }

    const seguimiento = this.seguimientoRepository.create({
      ...seguimientoData,
      envioId,
      estadoId,
    });

    await this.envioRepository.update(envioId, { estadoId });

    return await this.seguimientoRepository.save(seguimiento);
  }

  async findAll(): Promise<Seguimiento[]> {
    return await this.seguimientoRepository.find({
      relations: ['envio', 'estado'],
    });
  }

  async findOne(id: number): Promise<Seguimiento> {
    const seguimiento = await this.seguimientoRepository.findOne({
      where: { id },
      relations: ['envio', 'estado'],
    });
    if (!seguimiento) {
      throw new NotFoundException(`Seguimiento con ID ${id} no encontrado`);
    }
    return seguimiento;
  }

  async findByEnvio(envioId: number): Promise<Seguimiento[]> {
    return await this.seguimientoRepository.find({
      where: { envioId },
      relations: ['estado'],
      order: { fecha: 'ASC' },
    });
  }

  async update(id: number, updateSeguimientoDto: UpdateSeguimientoDto): Promise<Seguimiento> {
    const seguimiento = await this.findOne(id);
    const { estadoId, ...updateData } = updateSeguimientoDto;

    if (estadoId) {
      const estado = await this.estadoEnvioRepository.findOne({ where: { id: estadoId } });
      if (!estado) {
        throw new NotFoundException(`Estado con ID ${estadoId} no encontrado`);
      }
      await this.envioRepository.update(seguimiento.envioId, { estadoId });
    }

    Object.assign(seguimiento, updateData);
    if (estadoId) seguimiento.estadoId = estadoId;

    return await this.seguimientoRepository.save(seguimiento);
  }

  async remove(id: number): Promise<void> {
    const seguimiento = await this.findOne(id);
    await this.seguimientoRepository.remove(seguimiento);
  }

  async createEntrega(createEntregaDto: CreateEntregaDto): Promise<Entrega> {
    const { envioId, ...entregaData } = createEntregaDto;

    const envio = await this.envioRepository.findOne({ where: { id: envioId } });
    if (!envio) {
      throw new NotFoundException(`Envío con ID ${envioId} no encontrado`);
    }

    const existente = await this.entregaRepository.findOne({
      where: { envioId },
    });
    if (existente) {
      throw new ConflictException(`El envío ya tiene una entrega asociada`);
    }

    const entrega = this.entregaRepository.create({
      ...entregaData,
      envioId,
    });

    const estadoEntregado = await this.estadoEnvioRepository.findOne({ where: { nombre: 'Entregado' } });
    if (estadoEntregado) {
      await this.envioRepository.update(envioId, { estadoId: estadoEntregado.id });
    }

    return await this.entregaRepository.save(entrega);
  }

  async findEntregaByEnvio(envioId: number): Promise<Entrega> {
    const entrega = await this.entregaRepository.findOne({
      where: { envioId },
      relations: ['envio'],
    });
    if (!entrega) {
      throw new NotFoundException(`Entrega no encontrada para envío ${envioId}`);
    }
    return entrega;
  }

  async updateEntrega(
    envioId: number,
    updateEntregaDto: UpdateEntregaDto,
  ): Promise<Entrega> {
    const entrega = await this.findEntregaByEnvio(envioId);
    Object.assign(entrega, updateEntregaDto);
    return await this.entregaRepository.save(entrega);
  }

  async removeEntrega(envioId: number): Promise<void> {
    const entrega = await this.findEntregaByEnvio(envioId);
    await this.entregaRepository.remove(entrega);
  }
}