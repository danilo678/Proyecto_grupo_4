import { Module } from '@nestjs/common';
import { EstadoEnvioService } from './estadoenvio.service';
import { EstadoEnvioController } from './estadoenvio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEnvio } from './estadoenvio';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEnvio])],
  providers: [EstadoEnvioService],
  controllers: [EstadoEnvioController]
})
export class EstadoEnvioModule {}
