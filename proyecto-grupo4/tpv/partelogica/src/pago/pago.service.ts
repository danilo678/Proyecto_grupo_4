import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/create-pago.dto';
import { Pago } from './entities/pago.entity';
import { Envio } from '../envio/entities/envio.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const { envioId, ...pagoData } = createPagoDto;

    const envio = await this.envioRepository.findOne({ where: { id: envioId } });
    if (!envio) {
      throw new NotFoundException(`Envío con ID ${envioId} no encontrado`);
    }

    const existente = await this.pagoRepository.findOne({
      where: { envioId, monto: createPagoDto.monto },
    });
    if (existente) {
      throw new ConflictException(`Ya existe un pago con el mismo monto para este envío`);
    }

    const pago = this.pagoRepository.create({
      ...pagoData,
      envioId,
    });

    return await this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find({
      relations: ['envio', 'factura'],
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['envio', 'factura'],
    });
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return pago;
  }

  async findByEnvio(envioId: number): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { envioId },
      relations: ['factura'],
    });
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);
    const { envioId, ...updateData } = updatePagoDto;

    if (envioId) {
      const envio = await this.envioRepository.findOne({ where: { id: envioId } });
      if (!envio) {
        throw new NotFoundException(`Envío con ID ${envioId} no encontrado`);
      }
    }

    Object.assign(pago, updateData);
    if (envioId) pago.envioId = envioId;

    return await this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<void> {
    const pago = await this.findOne(id);
    if (pago.factura) {
      throw new ConflictException(`No se puede eliminar un pago con factura asociada`);
    }
    await this.pagoRepository.remove(pago);
  }
}