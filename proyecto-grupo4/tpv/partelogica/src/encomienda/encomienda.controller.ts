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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EncomiendaService } from './encomienda.service';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { Encomienda } from './entities/encomienda.entity';

@ApiTags('encomienda')
@Controller('api/v1/encomienda')
export class EncomiendaController {
  constructor(private readonly encomiendaService: EncomiendaService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una encomienda con su detalle y seguro opcional' })
  @ApiResponse({ status: 201, description: 'Encomienda creada exitosamente', type: Encomienda })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto: El código de encomienda ya existe' })
  async create(@Body() createEncomiendaDto: CreateEncomiendaDto) {
    return await this.encomiendaService.create(createEncomiendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las encomiendas' })
  @ApiResponse({ status: 200, description: 'Lista de encomiendas', type: [Encomienda] })
  async findAll() {
    return await this.encomiendaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una encomienda por ID' })
  @ApiResponse({ status: 200, description: 'Encomienda encontrada', type: Encomienda })
  @ApiResponse({ status: 404, description: 'Encomienda no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.encomiendaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una encomienda' })
  @ApiResponse({ status: 200, description: 'Encomienda actualizada exitosamente', type: Encomienda })
  @ApiResponse({ status: 404, description: 'Encomienda no encontrada' })
  @ApiResponse({ status: 409, description: 'Conflicto: El nuevo código ya está en uso' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEncomiendaDto: UpdateEncomiendaDto,
  ) {
    return await this.encomiendaService.update(id, updateEncomiendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una encomienda' })
  @ApiResponse({ status: 200, description: 'Encomienda eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Encomienda no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.encomiendaService.remove(id);
  }
}
