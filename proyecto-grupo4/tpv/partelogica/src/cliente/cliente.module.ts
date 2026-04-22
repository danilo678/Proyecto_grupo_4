import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { Contacto } from './entities/contacto/contacto.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Sucursal, Contacto])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
