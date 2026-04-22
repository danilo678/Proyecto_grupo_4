import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactoDto {
  @ApiProperty({ 
    description: 'Tipo de relación con el cliente', 
    maxLength: 50, 
    example: 'Emergencia',
    enum: ['Emergencia', 'Familiar', 'Trabajo', 'Otro']
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  tipo: string;

  @ApiProperty({ 
    description: 'Nombre completo del contacto de emergencia', 
    maxLength: 100, 
    example: 'Ana Perez',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional({ 
    description: 'Teléfono de contacto del contacto', 
    maxLength: 20, 
    example: '70000001',
    nullable: true
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;
}
