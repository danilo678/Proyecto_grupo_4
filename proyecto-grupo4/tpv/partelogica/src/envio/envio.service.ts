import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { Envio } from './entities/envio.entity';
import { Encomienda } from '../encomienda/entities/encomienda.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    @InjectRepository(Encomienda)
    private encomiendaRepository: Repository<Encomienda>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
    @InjectRepository(EstadoEnvio)
    private estadoEnvioRepository: Repository<EstadoEnvio>,
  ) {}

  async create(createEnvioDto: CreateEnvioDto): Promise<Envio> {
    const { encomiendaId, sucursalOrigenId, sucursalDestinoId, estadoId, ...envioData } = createEnvioDto;

    const encomienda = await this.encomiendaRepository.findOne({ where: { id: encomiendaId } });
    if (!encomienda) {
      throw new NotFoundException(`Encomienda con ID ${encomiendaId} no encontrada`);
    }

    const envioExistente = await this.envioRepository.findOne({
      where: { encomiendaId },
    });
    if (envioExistente) {
      throw new ConflictException(`La encomienda ya tiene un envío asociado`);
    }

    const sucursalOrigen = await this.sucursalRepository.findOne({ where: { id: sucursalOrigenId } });
    if (!sucursalOrigen) {
      throw new NotFoundException(`Sucursal de origen con ID ${sucursalOrigenId} no encontrada`);
    }

    const sucursalDestino = await this.sucursalRepository.findOne({ where: { id: sucursalDestinoId } });
    if (!sucursalDestino) {
      throw new NotFoundException(`Sucursal de destino con ID ${sucursalDestinoId} no encontrada`);
    }

    let estado: EstadoEnvio | undefined | null;
    if (estadoId) {
      estado = await this.estadoEnvioRepository.findOne({ where: { id: estadoId } });
      if (!estado) {
        throw new NotFoundException(`Estado con ID ${estadoId} no encontrado`);
      }
    }

    const envio = this.envioRepository.create({
      ...envioData,
      encomiendaId,
      sucursalOrigenId,
      sucursalDestinoId,
      estadoId: estadoId || 1,
    });

    return await this.envioRepository.save(envio);
  }

  async findAll(): Promise<Envio[]> {
    return await this.envioRepository.find({
      relations: ['encomienda', 'sucursalOrigen', 'sucursalDestino', 'estado', 'seguimientos'],
    });
  }

  async findOne(id: number): Promise<Envio> {
    const envio = await this.envioRepository.findOne({
      where: { id },
      relations: ['encomienda', 'sucursalOrigen', 'sucursalDestino', 'estado', 'seguimientos'],
    });
    if (!envio) {
      throw new NotFoundException(`Envío con ID ${id} no encontrado`);
    }
    return envio;
  }

  async update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    const envio = await this.findOne(id);
    const { encomiendaId, sucursalOrigenId, sucursalDestinoId, estadoId, ...updateData } = updateEnvioDto;

    if (encomiendaId) {
      const encomienda = await this.encomiendaRepository.findOne({ where: { id: encomiendaId } });
      if (!encomienda) {
        throw new NotFoundException(`Encomienda con ID ${encomiendaId} no encontrada`);
      }
    }

    if (sucursalOrigenId) {
      const sucursalOrigen = await this.sucursalRepository.findOne({ where: { id: sucursalOrigenId } });
      if (!sucursalOrigen) {
        throw new NotFoundException(`Sucursal de origen con ID ${sucursalOrigenId} no encontrada`);
      }
    }

    if (sucursalDestinoId) {
      const sucursalDestino = await this.sucursalRepository.findOne({ where: { id: sucursalDestinoId } });
      if (!sucursalDestino) {
        throw new NotFoundException(`Sucursal de destino con ID ${sucursalDestinoId} no encontrada`);
      }
    }

    if (estadoId) {
      const estado = await this.estadoEnvioRepository.findOne({ where: { id: estadoId } });
      if (!estado) {
        throw new NotFoundException(`Estado con ID ${estadoId} no encontrado`);
      }
    }

    Object.assign(envio, updateData);
    if (encomiendaId) envio.encomiendaId = encomiendaId;
    if (sucursalOrigenId) envio.sucursalOrigenId = sucursalOrigenId;
    if (sucursalDestinoId) envio.sucursalDestinoId = sucursalDestinoId;
    if (estadoId) envio.estadoId = estadoId;

    return await this.envioRepository.save(envio);
  }

  async remove(id: number): Promise<void> {
    const envio = await this.findOne(id);
    await this.envioRepository.remove(envio);
  }

  async findByEncomienda(encomiendaId: number): Promise<Envio> {
    const envio = await this.envioRepository.findOne({
      where: { encomiendaId },
      relations: ['encomienda', 'sucursalOrigen', 'sucursalDestino', 'estado'],
    });
    if (!envio) {
      throw new NotFoundException(`Envío no encontrado para encomienda ${encomiendaId}`);
    }
    return envio;
  }
}