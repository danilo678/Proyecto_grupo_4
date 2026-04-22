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
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { Sucursal } from './entities/sucursal.entity';

@ApiTags('sucursal')
@Controller('api/v1/sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sucursal' })
  @ApiResponse({
    status: 201,
    description: 'Sucursal creada exitosamente',
    type: Sucursal,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(
    @Body() createSucursalDto: CreateSucursalDto,
  ): Promise<Sucursal> {
    return await this.sucursalService.create(createSucursalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las sucursales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sucursales',
    type: [Sucursal],
  })
  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sucursal por ID' })
  @ApiParam({ name: 'id', description: 'ID de la sucursal' })
  @ApiResponse({
    status: 200,
    description: 'Sucursal encontrada',
    type: Sucursal,
  })
  @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Sucursal> {
    return await this.sucursalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sucursal' })
  @ApiParam({ name: 'id', description: 'ID de la sucursal' })
  @ApiResponse({
    status: 200,
    description: 'Sucursal actualizada',
    type: Sucursal,
  })
  @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSucursalDto: UpdateSucursalDto,
  ): Promise<Sucursal> {
    return await this.sucursalService.update(id, updateSucursalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sucursal' })
  @ApiParam({ name: 'id', description: 'ID de la sucursal' })
  @ApiResponse({ status: 200, description: 'Sucursal eliminada' })
  @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.sucursalService.remove(id);
  }
}
