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
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/create-pago.dto';
import { Pago } from './entities/pago.entity';

@ApiTags('pago')
@Controller('api/v1/pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({
    status: 201,
    description: 'Pago creado exitosamente',
    type: Pago,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    return await this.pagoService.create(createPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos',
    type: [Pago],
  })
  async findAll(): Promise<Pago[]> {
    return await this.pagoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiParam({ name: 'id', description: 'ID del pago' })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado',
    type: Pago,
  })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Pago> {
    return await this.pagoService.findOne(id);
  }

  @Get('envio/:envioId')
  @ApiOperation({ summary: 'Obtener pagos por ID de envío' })
  @ApiParam({ name: 'envioId', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos',
    type: [Pago],
  })
  async findByEnvio(
    @Param('envioId', ParseIntPipe) envioId: number,
  ): Promise<Pago[]> {
    return await this.pagoService.findByEnvio(envioId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago' })
  @ApiResponse({
    status: 200,
    description: 'Pago actualizado',
    type: Pago,
  })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ): Promise<Pago> {
    return await this.pagoService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago' })
  @ApiResponse({ status: 200, description: 'Pago eliminado' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.pagoService.remove(id);
  }
}