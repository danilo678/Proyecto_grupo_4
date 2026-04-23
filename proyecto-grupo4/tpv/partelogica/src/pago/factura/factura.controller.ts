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
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/create-factura.dto';
import { Factura } from './entities/factura.entity';

@ApiTags('factura')
@Controller('api/v1/factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({
    status: 201,
    description: 'Factura creada exitosamente',
    type: Factura,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return await this.facturaService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas',
    type: [Factura],
  })
  async findAll(): Promise<Factura[]> {
    return await this.facturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada',
    type: Factura,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Factura> {
    return await this.facturaService.findOne(id);
  }

  @Get('pago/:pagoId')
  @ApiOperation({ summary: 'Obtener factura por ID de pago' })
  @ApiParam({ name: 'pagoId', description: 'ID del pago' })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada',
    type: Factura,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async findByPago(
    @Param('pagoId', ParseIntPipe) pagoId: number,
  ): Promise<Factura> {
    return await this.facturaService.findByPago(pagoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({
    status: 200,
    description: 'Factura actualizada',
    type: Factura,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ): Promise<Factura> {
    return await this.facturaService.update(id, updateFacturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({ status: 200, description: 'Factura eliminada' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.facturaService.remove(id);
  }
}