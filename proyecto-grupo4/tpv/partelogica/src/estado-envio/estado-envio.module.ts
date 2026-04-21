import { Module } from '@nestjs/common';
import { EstadoEnvioService } from './estado-envio.service';
import { EstadoEnvioController } from './estado-envio.controller';

@Module({
  providers: [EstadoEnvioService],
  controllers: [EstadoEnvioController]
})
export class EstadoEnvioModule {}
