import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('sucursal')
export class Sucursal {
  @ApiProperty({
    description: 'ID único de la sucursal (autoincremental)',
    example: 1,
    type: Number
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    description: 'Nombre oficial de la sucursal',
    maxLength: 100,
    example: 'Sucursal Central - La Paz',
  })
  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @ApiProperty({
    description: 'Dirección física de la sucursal',
    example: 'Av. Siempre Viva 123, Zona Central',
  })
  @Column({ type: 'text' })
  direccion!: string;

  @ApiPropertyOptional({
    description: 'Ciudad donde se encuentra la sucursal',
    maxLength: 100,
    example: 'La Paz',
    enum: ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando']
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  ciudad?: string;

  @ApiProperty({
    description: 'Teléfono de contacto de la sucursal',
    maxLength: 20,
    example: '2221111',
    nullable: true
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono!: string;

  @ApiHideProperty()
  @ManyToMany(() => Cliente, (cliente) => cliente.sucursales)
  clientes!: Cliente[];
}
