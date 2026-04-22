import { Module } from '@nestjs/common';
import { TipopaqueteService } from './tipopaquete.service';
import { TipopaqueteController } from './tipopaquete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipopaquete } from './tipopaquete';

@Module({
  imports: [TypeOrmModule.forFeature([Tipopaquete])],
  providers: [TipopaqueteService],
  controllers: [TipopaqueteController]
})
export class TipopaqueteModule {}
