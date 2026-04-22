import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateContactoDto } from './entities/contacto/dto/create-contacto.dto';
import { UpdateContactoDto } from './entities/contacto/dto/update-contacto.dto';
import { Cliente } from './entities/cliente.entity';
import { Contacto } from './entities/contacto/contacto.entity';

@ApiTags('cliente')
@Controller('api/v1/cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado exitosamente',
    type: Cliente,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return await this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: [Cliente],
  })
  async findAll(): Promise<Cliente[]> {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: Cliente,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return await this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado',
    type: Cliente,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return await this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.clienteService.remove(id);
  }

  @Post(':id/contactos')
  @ApiOperation({ summary: 'Crear contacto para un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({
    status: 201,
    description: 'Contacto creado',
    type: Contacto,
  })
  async createContacto(
    @Param('id', ParseIntPipe) id: number,
    @Body() createContactoDto: CreateContactoDto,
  ): Promise<Contacto> {
    return await this.clienteService.createContacto(id, createContactoDto);
  }

  @Get(':id/contactos')
  @ApiOperation({ summary: 'Obtener contactos de un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiResponse({
    status: 200,
    description: 'Lista de contactos',
    type: [Contacto],
  })
  async findAllContactos(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Contacto[]> {
    return await this.clienteService.findAllContactos(id);
  }

  @Get(':id/contactos/:contactoId')
  @ApiOperation({ summary: 'Obtener un contacto por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiParam({ name: 'contactoId', description: 'ID del contacto' })
  @ApiResponse({
    status: 200,
    description: 'Contacto encontrado',
    type: Contacto,
  })
  async findOneContacto(
    @Param('id', ParseIntPipe) id: number,
    @Param('contactoId', ParseIntPipe) contactoId: number,
  ): Promise<Contacto> {
    return await this.clienteService.findOneContacto(id, contactoId);
  }

  @Patch(':id/contactos/:contactoId')
  @ApiOperation({ summary: 'Actualizar un contacto' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiParam({ name: 'contactoId', description: 'ID del contacto' })
  @ApiResponse({
    status: 200,
    description: 'Contacto actualizado',
    type: Contacto,
  })
  async updateContacto(
    @Param('id', ParseIntPipe) id: number,
    @Param('contactoId', ParseIntPipe) contactoId: number,
    @Body() updateContactoDto: UpdateContactoDto,
  ): Promise<Contacto> {
    return await this.clienteService.updateContacto(
      id,
      contactoId,
      updateContactoDto,
    );
  }

  @Delete(':id/contactos/:contactoId')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  @ApiParam({ name: 'contactoId', description: 'ID del contacto' })
  @ApiResponse({ status: 200, description: 'Contacto eliminado' })
  async removeContacto(
    @Param('id', ParseIntPipe) id: number,
    @Param('contactoId', ParseIntPipe) contactoId: number,
  ): Promise<void> {
    return await this.clienteService.removeContacto(id, contactoId);
  }
}
