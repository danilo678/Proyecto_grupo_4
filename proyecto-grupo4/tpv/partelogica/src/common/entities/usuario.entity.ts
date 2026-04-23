import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuario')
export class Usuario {
  @ApiProperty({ description: 'ID único del usuario', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Nombre de usuario único', example: 'admin', maxLength: 50 })
  @Column({ name: 'nombre_usuario', type: 'varchar', length: 50, unique: true })
  nombreUsuario!: string;

  @ApiProperty({ description: 'Password del usuario', example: '123' })
  @Column({ type: 'text' })
  password!: string;

  @ApiProperty({ description: 'Rol del usuario', example: 'admin', maxLength: 50, nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  rol!: string;

  @ApiProperty({ description: 'Estado del usuario', example: true })
  @Column({ type: 'boolean', default: true })
  estado!: boolean;
}