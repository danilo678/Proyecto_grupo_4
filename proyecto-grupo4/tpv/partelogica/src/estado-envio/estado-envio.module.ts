import { Module } from '@nestjs/common';
import { EstadoEnvioService } from './estado-envio.service';
import { EstadoEnvioController } from './estado-envio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEnvio } from './estado-envio';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEnvio])],
  providers: [EstadoEnvioService],
  controllers: [EstadoEnvioController]
})
export class EstadoEnvioModule {}
