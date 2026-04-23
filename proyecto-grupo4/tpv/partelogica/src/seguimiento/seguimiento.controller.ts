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
import { SeguimientoService } from './seguimiento.service';
import { CreateSeguimientoDto, CreateEntregaDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto, UpdateEntregaDto } from './dto/create-seguimiento.dto';
import { Seguimiento } from './entities/seguimiento.entity';
import { Entrega } from './entities/entrega.entity';

@ApiTags('seguimiento')
@Controller('api/v1/seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo seguimiento' })
  @ApiResponse({
    status: 201,
    description: 'Seguimiento creado exitosamente',
    type: Seguimiento,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(
    @Body() createSeguimientoDto: CreateSeguimientoDto,
  ): Promise<Seguimiento> {
    return await this.seguimientoService.create(createSeguimientoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los seguimientos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de seguimientos',
    type: [Seguimiento],
  })
  async findAll(): Promise<Seguimiento[]> {
    return await this.seguimientoService.findAll();
  }

  @Get('envio/:envioId')
  @ApiOperation({ summary: 'Obtener seguimientos por ID de envío' })
  @ApiParam({ name: 'envioId', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Lista de seguimientos',
    type: [Seguimiento],
  })
  async findByEnvio(
    @Param('envioId', ParseIntPipe) envioId: number,
  ): Promise<Seguimiento[]> {
    return await this.seguimientoService.findByEnvio(envioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un seguimiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({
    status: 200,
    description: 'Seguimiento encontrado',
    type: Seguimiento,
  })
  @ApiResponse({ status: 404, description: 'Seguimiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Seguimiento> {
    return await this.seguimientoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un seguimiento' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({
    status: 200,
    description: 'Seguimiento actualizado',
    type: Seguimiento,
  })
  @ApiResponse({ status: 404, description: 'Seguimiento no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeguimientoDto: UpdateSeguimientoDto,
  ): Promise<Seguimiento> {
    return await this.seguimientoService.update(id, updateSeguimientoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un seguimiento' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento' })
  @ApiResponse({ status: 200, description: 'Seguimiento eliminado' })
  @ApiResponse({ status: 404, description: 'Seguimiento no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.seguimientoService.remove(id);
  }

  @Post('entrega')
  @ApiOperation({ summary: 'Registrar una entrega' })
  @ApiResponse({
    status: 201,
    description: 'Entrega creada exitosamente',
    type: Entrega,
  })
  async createEntrega(
    @Body() createEntregaDto: CreateEntregaDto,
  ): Promise<Entrega> {
    return await this.seguimientoService.createEntrega(createEntregaDto);
  }

  @Get('entrega/envio/:envioId')
  @ApiOperation({ summary: 'Obtener entrega por ID de envío' })
  @ApiParam({ name: 'envioId', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Entrega encontrada',
    type: Entrega,
  })
  @ApiResponse({ status: 404, description: 'Entrega no encontrada' })
  async findEntregaByEnvio(
    @Param('envioId', ParseIntPipe) envioId: number,
  ): Promise<Entrega> {
    return await this.seguimientoService.findEntregaByEnvio(envioId);
  }

  @Patch('entrega/envio/:envioId')
  @ApiOperation({ summary: 'Actualizar una entrega' })
  @ApiParam({ name: 'envioId', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Entrega actualizada',
    type: Entrega,
  })
  async updateEntrega(
    @Param('envioId', ParseIntPipe) envioId: number,
    @Body() updateEntregaDto: UpdateEntregaDto,
  ): Promise<Entrega> {
    return await this.seguimientoService.updateEntrega(envioId, updateEntregaDto);
  }

  @Delete('entrega/envio/:envioId')
  @ApiOperation({ summary: 'Eliminar una entrega' })
  @ApiParam({ name: 'envioId', description: 'ID del envío' })
  @ApiResponse({ status: 200, description: 'Entrega eliminada' })
  async removeEntrega(
    @Param('envioId', ParseIntPipe) envioId: number,
  ): Promise<void> {
    return await this.seguimientoService.removeEntrega(envioId);
  }
}