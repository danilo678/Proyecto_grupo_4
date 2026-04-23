import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncomiendaService } from './encomienda.service';
import { EncomiendaController } from './encomienda.controller';
import { Encomienda } from './entities/encomienda.entity';
import { DetalleEncomienda } from './entities/detalle-encomienda.entity';
import { Seguro } from './entities/seguro.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { TipoPaquete } from '../common/entities/tipo-paquete.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encomienda,
      DetalleEncomienda,
      Seguro,
      Cliente,
      TipoPaquete,
    ]),
  ],
  controllers: [EncomiendaController],
  providers: [EncomiendaService],
  exports: [EncomiendaService],
})
export class EncomiendaModule {}