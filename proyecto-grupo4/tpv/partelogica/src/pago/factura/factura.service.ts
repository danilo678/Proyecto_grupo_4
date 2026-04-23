import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/create-factura.dto';
import { Factura } from './entities/factura.entity';
import { Pago } from '../entities/pago.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const { pagoId, ...facturaData } = createFacturaDto;

    const pago = await this.pagoRepository.findOne({ where: { id: pagoId } });
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${pagoId} no encontrado`);
    }

    const existente = await this.facturaRepository.findOne({
      where: { pagoId },
    });
    if (existente) {
      throw new ConflictException(`El pago ya tiene una factura asociada`);
    }

    const factura = this.facturaRepository.create({
      ...facturaData,
      pagoId,
    });

    return await this.facturaRepository.save(factura);
  }

  async findAll(): Promise<Factura[]> {
    return await this.facturaRepository.find({
      relations: ['pago'],
    });
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { id },
      relations: ['pago'],
    });
    if (!factura) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }
    return factura;
  }

  async findByPago(pagoId: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { pagoId },
      relations: ['pago'],
    });
    if (!factura) {
      throw new NotFoundException(`Factura no encontrada para pago ${pagoId}`);
    }
    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.findOne(id);
    Object.assign(factura, updateFacturaDto);
    return await this.facturaRepository.save(factura);
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura);
  }
}