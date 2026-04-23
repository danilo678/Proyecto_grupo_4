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
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/create-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@ApiTags('empleado')
@Controller('api/v1/empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  @ApiResponse({
    status: 201,
    description: 'Empleado creado exitosamente',
    type: Empleado,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    return await this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los empleados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados',
    type: [Empleado],
  })
  async findAll(): Promise<Empleado[]> {
    return await this.empleadoService.findAll();
  }

  @Get('sucursal/:sucursalId')
  @ApiOperation({ summary: 'Obtener empleados por sucursal' })
  @ApiParam({ name: 'sucursalId', description: 'ID de la sucursal' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados',
    type: [Empleado],
  })
  async findBySucursal(
    @Param('sucursalId', ParseIntPipe) sucursalId: number,
  ): Promise<Empleado[]> {
    return await this.empleadoService.findBySucursal(sucursalId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un empleado por ID' })
  @ApiParam({ name: 'id', description: 'ID del empleado' })
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado',
    type: Empleado,
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Empleado> {
    return await this.empleadoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un empleado' })
  @ApiParam({ name: 'id', description: 'ID del empleado' })
  @ApiResponse({
    status: 200,
    description: 'Empleado actualizado',
    type: Empleado,
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    return await this.empleadoService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un empleado' })
  @ApiParam({ name: 'id', description: 'ID del empleado' })
  @ApiResponse({ status: 200, description: 'Empleado eliminado' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.empleadoService.remove(id);
  }
}