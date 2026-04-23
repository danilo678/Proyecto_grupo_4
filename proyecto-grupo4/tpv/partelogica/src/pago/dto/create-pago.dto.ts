import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

const MetodosPagoValidos = ['Efectivo', 'QR', 'Tarjeta', 'Transferencia', 'Cheque'];

export class CreatePagoDto {
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
    description: 'Monto del pago',
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  monto!: number;

  @ApiProperty({
    description: 'Método de pago',
    example: 'Efectivo',
    enum: MetodosPagoValidos,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(MetodosPagoValidos)
  metodo!: string;
}

export class UpdatePagoDto {
  @ApiPropertyOptional({
    description: 'ID del envío asociado',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  envioId?: number;

  @ApiPropertyOptional({
    description: 'Monto del pago',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  monto?: number;

  @ApiPropertyOptional({
    description: 'Método de pago',
    example: 'QR',
    enum: MetodosPagoValidos,
  })
  @IsOptional()
  @IsString()
  @IsIn(MetodosPagoValidos)
  metodo?: string;
}