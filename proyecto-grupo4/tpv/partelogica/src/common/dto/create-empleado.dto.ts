import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmpleadoDto {
  @ApiProperty({
    description: 'Nombre del empleado',
    example: 'Luis',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @ApiProperty({
    description: 'Apellido del empleado',
    example: 'Gomez',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido!: string;

  @ApiProperty({
    description: 'Cargo del empleado',
    example: 'Cajero',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  cargo!: string;

  @ApiPropertyOptional({
    description: 'Teléfono del empleado',
    example: '77788888',
    maxLength: 20,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiPropertyOptional({
    description: 'ID de la sucursal',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  sucursalId?: number;
}

export class UpdateEmpleadoDto {
  @ApiPropertyOptional({
    description: 'Nombre del empleado',
    example: 'Luis',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Apellido del empleado',
    example: 'Gomez',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellido?: string;

  @ApiPropertyOptional({
    description: 'Cargo del empleado',
    example: 'Operador',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cargo?: string;

  @ApiPropertyOptional({
    description: 'Teléfono del empleado',
    example: '77788888',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiPropertyOptional({
    description: 'ID de la sucursal',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  sucursalId?: number;
}