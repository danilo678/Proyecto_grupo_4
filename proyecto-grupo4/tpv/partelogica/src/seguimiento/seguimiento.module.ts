import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguimientoService } from './seguimiento.service';
import { SeguimientoController } from './seguimiento.controller';
import { Seguimiento } from './entities/seguimiento.entity';
import { Entrega } from './entities/entrega.entity';
import { Envio } from '../envio/entities/envio.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Seguimiento,
      Entrega,
      Envio,
      EstadoEnvio,
    ]),
  ],
  controllers: [SeguimientoController],
  providers: [SeguimientoService],
  exports: [SeguimientoService],
})
export class SeguimientoModule {}