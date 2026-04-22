import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre(s) del cliente',
    maxLength: 100,
    example: 'Juan',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Apellido(s) del cliente',
    maxLength: 100,
    example: 'Perez',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido: string;

  @ApiProperty({
    description: 'Cédula de identidad (唯一 - no puede repetirse)',
    maxLength: 20,
    example: '123456',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  ci: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto principal',
    maxLength: 20,
    example: '77711111',
    nullable: true
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del cliente',
    maxLength: 100,
    example: 'juan@gmail.com',
    format: 'email',
    nullable: true
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    description: 'Dirección del cliente',
    example: 'La Paz - Zona Sopocachi',
    nullable: true
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Array de IDs de sucursales a asociar',
    type: [Number],
    example: [1, 2],
    isArray: true,
    nullable: true
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  sucursalIds?: number[];
}
