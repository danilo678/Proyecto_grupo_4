import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryFailedError, Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateContactoDto } from './entities/contacto/dto/create-contacto.dto';
import { UpdateContactoDto } from './entities/contacto/dto/update-contacto.dto';
import { Cliente } from './entities/cliente.entity';
import { Contacto } from './entities/contacto/contacto.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Contacto)
    private contactoRepository: Repository<Contacto>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { sucursalIds, ...clienteData } = createClienteDto;
    const cliente = this.clienteRepository.create(clienteData);

    if (sucursalIds && sucursalIds.length > 0) {
      const sucursales = await this.sucursalRepository.find({
        where: { id: In(sucursalIds) },
      });
      cliente.sucursales = sucursales;
    }

    try {
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new ConflictException(
          `Ya existe un cliente con la cédula de identidad '${clienteData.ci}'`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: ['sucursales', 'contactos'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['sucursales', 'contactos'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);
    const { sucursalIds, ...updateData } = updateClienteDto;

    Object.assign(cliente, updateData);

    if (sucursalIds !== undefined) {
      if (sucursalIds.length > 0) {
        const sucursales = await this.sucursalRepository.find({
          where: { id: In(sucursalIds) },
        });
        cliente.sucursales = sucursales;
      } else {
        cliente.sucursales = [];
      }
    }

    try {
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new ConflictException(
          `Ya existe otro cliente con la cédula de identidad '${updateData.ci}'`,
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }

  async createContacto(
    clienteId: number,
    createContactoDto: CreateContactoDto,
  ): Promise<Contacto> {
    const cliente = await this.findOne(clienteId);
    const contacto = this.contactoRepository.create({
      ...createContactoDto,
      clienteId: cliente.id,
    });
    return await this.contactoRepository.save(contacto);
  }

  async findAllContactos(clienteId: number): Promise<Contacto[]> {
    return await this.contactoRepository.find({
      where: { clienteId },
      relations: ['cliente'],
    });
  }

  async findOneContacto(
    clienteId: number,
    contactoId: number,
  ): Promise<Contacto> {
    const contacto = await this.contactoRepository.findOne({
      where: { id: contactoId, clienteId },
    });
    if (!contacto) {
      throw new NotFoundException(
        `Contacto con ID ${contactoId} no encontrado para cliente ${clienteId}`,
      );
    }
    return contacto;
  }

  async updateContacto(
    clienteId: number,
    contactoId: number,
    updateContactoDto: UpdateContactoDto,
  ): Promise<Contacto> {
    const contacto = await this.findOneContacto(clienteId, contactoId);
    Object.assign(contacto, updateContactoDto);
    return await this.contactoRepository.save(contacto);
  }

  async removeContacto(clienteId: number, contactoId: number): Promise<void> {
    const contacto = await this.findOneContacto(clienteId, contactoId);
    await this.contactoRepository.remove(contacto);
  }
}
