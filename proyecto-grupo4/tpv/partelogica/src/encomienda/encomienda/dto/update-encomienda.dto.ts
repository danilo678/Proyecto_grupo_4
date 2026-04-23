import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEncomiendaDto {
  @ApiPropertyOptional({
    description: 'Código único de跟踪',
    example: 'ENC001',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigo?: string;

  @ApiPropertyOptional({
    description: 'ID del cliente remitente',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  remitenteId?: number;

  @ApiPropertyOptional({
    description: 'ID del cliente destinatario',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  destinatarioId?: number;

  @ApiPropertyOptional({
    description: 'Descripción del contenido',
    example: 'Ropa',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Peso en kg',
    example: 5.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  peso?: number;

  @ApiPropertyOptional({
    description: 'Volumen en m3',
    example: 0.3,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  volumen?: number;

  @ApiPropertyOptional({
    description: 'Valor declarado',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorDeclarado?: number;
}

export class UpdateDetalleEncomiendaDto {
  @ApiPropertyOptional({
    description: 'ID del tipo de paquete',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  tipoId?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de paquetes',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  cantidad?: number;

  @ApiPropertyOptional({
    description: 'Observaciones',
    example: 'Cajas medianas',
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateSeguroDto {
  @ApiPropertyOptional({
    description: 'Monto del seguro',
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  monto?: number;

  @ApiPropertyOptional({
    description: 'Descripción del seguro',
    example: 'Seguro básico',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}