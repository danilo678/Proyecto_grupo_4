import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/create-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const { sucursalId, ...empleadoData } = createEmpleadoDto;

    if (sucursalId) {
      const sucursal = await this.sucursalRepository.findOne({ where: { id: sucursalId } });
      if (!sucursal) {
        throw new NotFoundException(`Sucursal con ID ${sucursalId} no encontrada`);
      }
    }

    const empleado = this.empleadoRepository.create({
      ...empleadoData,
      sucursalId,
    });

    return await this.empleadoRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return await this.empleadoRepository.find({
      relations: ['sucursal'],
    });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({
      where: { id },
      relations: ['sucursal'],
    });
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
    return empleado;
  }

  async findBySucursal(sucursalId: number): Promise<Empleado[]> {
    return await this.empleadoRepository.find({
      where: { sucursalId },
      relations: ['sucursal'],
    });
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    const { sucursalId, ...updateData } = updateEmpleadoDto;

    if (sucursalId) {
      const sucursal = await this.sucursalRepository.findOne({ where: { id: sucursalId } });
      if (!sucursal) {
        throw new NotFoundException(`Sucursal con ID ${sucursalId} no encontrada`);
      }
    }

    Object.assign(empleado, updateData);
    if (sucursalId) empleado.sucursalId = sucursalId;

    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}