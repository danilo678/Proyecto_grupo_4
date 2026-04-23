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

export class CreateFacturaDto {
  @ApiProperty({
    description: 'ID del pago asociado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  pagoId!: number;

  @ApiProperty({
    description: 'Número de factura',
    example: 'F001',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  numeroFactura!: string;

  @ApiProperty({
    description: 'NIT del cliente',
    example: '1234567',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  nit!: string;

  @ApiProperty({
    description: 'Razón social',
    example: 'Juan Perez',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  razonSocial!: string;
}

export class UpdateFacturaDto {
  @ApiPropertyOptional({
    description: 'Número de factura',
    example: 'F001',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  numeroFactura?: string;

  @ApiPropertyOptional({
    description: 'NIT del cliente',
    example: '1234567',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nit?: string;

  @ApiPropertyOptional({
    description: 'Razón social',
    example: 'Juan Perez',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  razonSocial?: string;
}