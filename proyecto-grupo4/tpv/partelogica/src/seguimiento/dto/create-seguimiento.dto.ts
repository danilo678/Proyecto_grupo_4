import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSeguimientoDto {
  @ApiProperty({
    description: 'ID del envío asociado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  envioId!: number;

  @ApiProperty({
    description: 'ID del estado del envío',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  estadoId!: number;

  @ApiPropertyOptional({
    description: 'Ubicación actual',
    example: 'La Paz',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiPropertyOptional({
    description: 'Observaciones',
    example: 'Transporte terrestre',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateSeguimientoDto {
  @ApiPropertyOptional({
    description: 'ID del estado del envío',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  estadoId?: number;

  @ApiPropertyOptional({
    description: 'Ubicación actual',
    example: 'Cochabamba',
  })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiPropertyOptional({
    description: 'Observaciones',
    example: 'En tránsito',
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateEntregaDto {
  @ApiProperty({
    description: 'ID del envío asociado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  envioId!: number;

  @ApiPropertyOptional({
    description: 'Fecha de entrega (ISO)',
    example: '2024-01-17T14:00:00Z',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fechaEntrega?: string;

  @ApiProperty({
    description: 'Nombre de quien recibe',
    example: 'Juan Perez',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  nombreRecibe!: string;

  @ApiProperty({
    description: 'Cédula de identidad de quien recibe',
    example: '123456',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  ciRecibe!: string;

  @ApiPropertyOptional({
    description: 'Firma de quien recibe',
    example: 'FirmaDigital',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  firma?: string;
}

export class UpdateEntregaDto {
  @ApiPropertyOptional({
    description: 'Fecha de entrega (ISO)',
    example: '2024-01-17T14:00:00Z',
  })
  @IsOptional()
  @IsString()
  fechaEntrega?: string;

  @ApiPropertyOptional({
    description: 'Nombre de quien recibe',
    example: 'Juan Perez',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  nombreRecibe?: string;

  @ApiPropertyOptional({
    description: 'Cédula de identidad de quien recibe',
    example: '123456',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  ciRecibe?: string;

  @ApiPropertyOptional({
    description: 'Firma de quien recibe',
    example: 'FirmaDigital',
  })
  @IsOptional()
  @IsString()
  firma?: string;
}