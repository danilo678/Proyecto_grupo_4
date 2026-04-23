import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const RolesValidos = ['admin', 'operador', 'supervisor', 'cajero'];

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'admin',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  nombreUsuario!: string;

  @ApiProperty({
    description: 'Password del usuario',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'admin',
    enum: RolesValidos,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(RolesValidos)
  rol!: string;

  @ApiPropertyOptional({
    description: 'Estado del usuario',
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}

export class UpdateUsuarioDto {
  @ApiPropertyOptional({
    description: 'Nombre de usuario',
    example: 'nuevo_usuario',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  nombreUsuario?: string;

  @ApiPropertyOptional({
    description: 'Password del usuario',
    example: 'nuevapass',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario',
    example: 'operador',
    enum: RolesValidos,
  })
  @IsOptional()
  @IsString()
  @IsIn(RolesValidos)
  rol?: string;

  @ApiPropertyOptional({
    description: 'Estado del usuario',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}