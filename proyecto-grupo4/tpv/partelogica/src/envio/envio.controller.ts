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
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { Envio } from './entities/envio.entity';

@ApiTags('envio')
@Controller('api/v1/envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo envío' })
  @ApiResponse({
    status: 201,
    description: 'Envío creado exitosamente',
    type: Envio,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createEnvioDto: CreateEnvioDto): Promise<Envio> {
    return await this.envioService.create(createEnvioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los envíos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de envíos',
    type: [Envio],
  })
  async findAll(): Promise<Envio[]> {
    return await this.envioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un envío por ID' })
  @ApiParam({ name: 'id', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Envío encontrado',
    type: Envio,
  })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Envio> {
    return await this.envioService.findOne(id);
  }

  @Get('encomienda/:encomiendaId')
  @ApiOperation({ summary: 'Obtener envío por ID de encomienda' })
  @ApiParam({ name: 'encomiendaId', description: 'ID de la encomienda' })
  @ApiResponse({
    status: 200,
    description: 'Envío encontrado',
    type: Envio,
  })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  async findByEncomienda(
    @Param('encomiendaId', ParseIntPipe) encomiendaId: number,
  ): Promise<Envio> {
    return await this.envioService.findByEncomienda(encomiendaId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío' })
  @ApiResponse({
    status: 200,
    description: 'Envío actualizado',
    type: Envio,
  })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnvioDto: UpdateEnvioDto,
  ): Promise<Envio> {
    return await this.envioService.update(id, updateEnvioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío' })
  @ApiResponse({ status: 200, description: 'Envío eliminado' })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.envioService.remove(id);
  }
}