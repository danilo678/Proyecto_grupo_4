import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Usuario } from './entities/usuario.entity';
import { Empleado } from './entities/empleado.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Empleado,
      Sucursal,
    ]),
  ],
  controllers: [UsuarioController, EmpleadoController],
  providers: [UsuarioService, EmpleadoService],
  exports: [UsuarioService, EmpleadoService],
})
export class CommonModule {}