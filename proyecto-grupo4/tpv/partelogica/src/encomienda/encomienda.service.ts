import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { Encomienda } from './entities/encomienda.entity';
import { DetalleEncomienda } from './entities/detalle-encomienda.entity';
import { Seguro } from './entities/seguro.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { TipoPaquete } from '../common/entities/tipo-paquete.entity';

@Injectable()
export class EncomiendaService {
  constructor(
    @InjectRepository(Encomienda)
    private encomiendaRepository: Repository<Encomienda>,
    @InjectRepository(DetalleEncomienda)
    private detalleRepository: Repository<DetalleEncomienda>,
    @InjectRepository(Seguro)
    private seguroRepository: Repository<Seguro>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(TipoPaquete)
    private tipoPaqueteRepository: Repository<TipoPaquete>,
    private dataSource: DataSource,
  ) {}

  async create(createEncomiendaDto: CreateEncomiendaDto): Promise<Encomienda> {
    const { remitenteId, destinatarioId, detalle, seguro, ...encomiendaData } =
      createEncomiendaDto;

    // Verificar remitente y destinatario antes de iniciar transacción
    const remitente = await this.clienteRepository.findOne({
      where: { id: remitenteId },
    });
    if (!remitente) {
      throw new NotFoundException(
        `Cliente remitente con ID ${remitenteId} no encontrado`,
      );
    }

    const destinatario = await this.clienteRepository.findOne({
      where: { id: destinatarioId },
    });
    if (!destinatario) {
      throw new NotFoundException(
        `Cliente destinatario con ID ${destinatarioId} no encontrado`,
      );
    }

    // Verificar tipo de paquete
    const tipo = await this.tipoPaqueteRepository.findOne({
      where: { id: detalle.tipoId },
    });
    if (!tipo) {
      throw new NotFoundException(
        `Tipo de paquete con ID ${detalle.tipoId} no encontrado`,
      );
    }

    // Ejecutar transacción
    return await this.dataSource.transaction(async (manager) => {
      try {
        // 1. Guardar Encomienda Principal
        const newEncomienda = manager.create(Encomienda, {
          ...encomiendaData,
          remitenteId,
          destinatarioId,
        });
        const savedEncomienda = await manager.save(newEncomienda);

        // 2. Guardar Detalle usando el ID generado
        const newDetalle = manager.create(DetalleEncomienda, {
          ...detalle,
          encomiendaId: savedEncomienda.id,
        });
        await manager.save(newDetalle);

        // 3. Guardar Seguro si existe en el DTO
        if (seguro) {
          const newSeguro = manager.create(Seguro, {
            ...seguro,
            encomiendaId: savedEncomienda.id,
          });
          await manager.save(newSeguro);
        }

        // Retornar la encomienda completa con sus relaciones
        const result = await manager.findOne(Encomienda, {
          where: { id: savedEncomienda.id },
          relations: ['remitente', 'destinatario', 'detalles', 'seguro'],
        });
        if (!result) throw new Error('Error al recuperar la encomienda guardada');
        return result;
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          (error as any).code === '23505'
        ) {
          throw new ConflictException(
            `Ya existe una encomienda con código '${encomiendaData.codigo}'`,
          );
        }
        throw error;
      }
    });
  }

  async findAll(): Promise<Encomienda[]> {
    return await this.encomiendaRepository.find({
      relations: [
        'remitente',
        'destinatario',
        'detalles',
        'detalles.tipo',
        'seguro',
      ],
    });
  }

  async findOne(id: number): Promise<Encomienda> {
    const encomienda = await this.encomiendaRepository.findOne({
      where: { id },
      relations: [
        'remitente',
        'destinatario',
        'detalles',
        'detalles.tipo',
        'seguro',
      ],
    });
    if (!encomienda) {
      throw new NotFoundException(`Encomienda con ID ${id} no encontrada`);
    }
    return encomienda;
  }

  async update(
    id: number,
    updateEncomiendaDto: UpdateEncomiendaDto,
  ): Promise<Encomienda> {
    const { remitenteId, destinatarioId, ...encomiendaData } =
      updateEncomiendaDto;

    const encomienda = await this.findOne(id);

    if (remitenteId) {
      const remitente = await this.clienteRepository.findOne({
        where: { id: remitenteId },
      });
      if (!remitente) {
        throw new NotFoundException(
          `Cliente remitente con ID ${remitenteId} no encontrado`,
        );
      }
      encomienda.remitenteId = remitenteId;
    }

    if (destinatarioId) {
      const destinatario = await this.clienteRepository.findOne({
        where: { id: destinatarioId },
      });
      if (!destinatario) {
        throw new NotFoundException(
          `Cliente destinatario con ID ${destinatarioId} no encontrado`,
        );
      }
      encomienda.destinatarioId = destinatarioId;
    }

    Object.assign(encomienda, encomiendaData);

    try {
      await this.encomiendaRepository.save(encomienda);
      return await this.findOne(id);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        throw new ConflictException(
          `Ya existe una encomienda con código '${encomiendaData.codigo}'`,
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const encomienda = await this.encomiendaRepository.findOne({
      where: { id },
      relations: ['detalles', 'seguro'],
    });
    if (!encomienda) {
      throw new NotFoundException(`Encomienda con ID ${id} no encontrada`);
    }
    await this.encomiendaRepository.remove(encomienda);
  }
}
