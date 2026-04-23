import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEnvioDto {
  @ApiPropertyOptional({
    description: 'ID de la encomienda asociada',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  encomiendaId?: number;

  @ApiPropertyOptional({
    description: 'ID de la sucursal de origen',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  sucursalOrigenId?: number;

  @ApiPropertyOptional({
    description: 'ID de la sucursal de destino',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  sucursalDestinoId?: number;

  @ApiPropertyOptional({
    description: 'Fecha de envío (ISO)',
    example: '2024-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fechaEnvio?: string;

  @ApiPropertyOptional({
    description: 'Fecha estimada de entrega (ISO)',
    example: '2024-01-17T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fechaEstimada?: string;

  @ApiPropertyOptional({
    description: 'Costo del envío',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  costo?: number;

  @ApiPropertyOptional({
    description: 'ID del estado del envío',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  estadoId?: number;
}