import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { Sucursal } from './entities/sucursal.entity';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create(createSucursalDto);
    return await this.sucursalRepository.save(sucursal);
  }

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find();
  }

  async findOne(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOne({
      where: { id },
    });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }
    return sucursal;
  }

  async update(
    id: number,
    updateSucursalDto: UpdateSucursalDto,
  ): Promise<Sucursal> {
    const sucursal = await this.findOne(id);
    const updatedSucursal = this.sucursalRepository.merge(
      sucursal,
      updateSucursalDto,
    );
    return await this.sucursalRepository.save(updatedSucursal);
  }

  async remove(id: number): Promise<void> {
    const sucursal = await this.findOne(id);
    await this.sucursalRepository.remove(sucursal);
  }
}
