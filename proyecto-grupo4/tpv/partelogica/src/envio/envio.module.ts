import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Envio } from './entities/envio.entity';
import { Encomienda } from '../encomienda/entities/encomienda.entity';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { EstadoEnvio } from '../common/entities/estado-envio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Envio,
      Encomienda,
      Sucursal,
      EstadoEnvio,
    ]),
  ],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}