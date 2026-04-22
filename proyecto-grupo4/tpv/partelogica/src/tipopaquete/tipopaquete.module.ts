import { Module } from '@nestjs/common';
import { TipopaqueteService } from './tipopaquete.service';
import { tipopaquetecontroller } from './tipopaquete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipopaquete } from './tipopaquete';

@Module({
  imports: [TypeOrmModule.forFeature([Tipopaquete])],
  providers: [TipopaqueteService],
  controllers: [tipopaquetecontroller]
})
export class TipopaqueteModule {}
