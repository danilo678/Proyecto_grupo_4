import { IsString, IsNotEmpty, IsOptional, MaxLength,  IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const  Ciudades_validas = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando']
export class CreateSucursalDto { 
  @ApiProperty({ 
    description: 'Nombre oficial de la sucursal', 
    maxLength: 100, 
    example: 'Sucursal Central - La Paz',
    minLength: 1
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @ApiProperty({ 
    description: 'Dirección física completa de la sucursal', 
    example: 'Av. Siempre Viva #123, Zona Central',
    minLength: 5
  })
  @IsNotEmpty()
  @IsString()
  direccion!: string;

  @ApiPropertyOptional({ 
    description: 'Ciudad donde se encuentra la sucursal', 
    maxLength: 100, 
    example: 'La Paz',
    enum: Ciudades_validas
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  @IsIn(Ciudades_validas, { message: 'La ciudad debe ser un departamento válido de Bolivia' })
  ciudad?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto de la sucursal (opcional)',
    maxLength: 20,
    example: '2221111',
    nullable: true
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefono?: string;
}
