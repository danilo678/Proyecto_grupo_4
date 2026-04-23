import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDetalleDto {
  @ApiProperty({ description: 'ID del tipo de paquete', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  tipoId: number;

  @ApiProperty({ description: 'Cantidad de items', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cantidad: number;

  @ApiPropertyOptional({ description: 'Observaciones del detalle', example: 'Fragil' })
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateSeguroDto {
  @ApiProperty({ description: 'Monto del seguro', example: 50.00 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  monto: number;

  @ApiPropertyOptional({ description: 'Descripción del seguro', example: 'Seguro Basico' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class CreateEncomiendaDto {
  @ApiProperty({ description: 'Código único de encomienda', example: 'ENC001' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  codigo: string;

  @ApiProperty({ description: 'ID del cliente remitente', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  remitenteId: number;

  @ApiProperty({ description: 'ID del cliente destinatario', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  destinatarioId: number;

  @ApiPropertyOptional({ description: 'Descripción general', example: 'Caja con artículos electrónicos' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Peso en kg', example: 10.50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  peso?: number;

  @ApiPropertyOptional({ description: 'Volumen en m3', example: 0.25 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  volumen?: number;

  @ApiPropertyOptional({ description: 'Valor declarado en Bs', example: 1000.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  valorDeclarado?: number;

  @ApiProperty({ type: CreateDetalleDto, description: 'Detalle del paquete' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateDetalleDto)
  detalle: CreateDetalleDto;

  @ApiPropertyOptional({ type: CreateSeguroDto, description: 'Seguro opcional' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSeguroDto)
  seguro?: CreateSeguroDto;
}
