import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './entities/pago.entity';
import { Envio } from '../envio/entities/envio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pago,
      Envio,
    ]),
  ],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService],
})
export class PagoModule {}