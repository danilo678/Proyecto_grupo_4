import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Envio } from '../../envio/entities/envio.entity';
import { Empleado } from '../../common/entities/empleado.entity';

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

  @ApiProperty({ 
    description: 'Ciudad donde se encuentra la sucursal', 
    maxLength: 100, 
    example: 'La Paz',
    enum: ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando']
  })
  @Column({ type: 'varchar', length: 100, nullable: true})
  ciudad?: string;

  @ApiProperty({
    description: 'Teléfono de contacto de la sucursal',
    maxLength: 20,
    example: '2221111',
    nullable: true
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono!: string;

  @ApiProperty({ 
    description: 'Lista de clientes asociados a esta sucursal', 
    type: () => [Cliente], 
    example: [
      { "id": 1, "nombre": "Juan Perez", "ci": "123456" },
      { "id": 2, "nombre": "Maria Lopez", "ci": "654321" }
    ],
    isArray: true
  })
  @ManyToMany(() => Cliente, (cliente) => cliente.sucursales)
  clientes!: Cliente[];

  @ApiProperty({
    description: 'Envíos originados desde esta sucursal',
    type: () => [Envio],
    isArray: true
  })
  @OneToMany(() => Envio, (envio) => envio.sucursalOrigen)
  enviosOriginados!: Envio[];

  @ApiProperty({
    description: 'Envíos destinados a esta sucursal',
    type: () => [Envio],
    isArray: true
  })
  @OneToMany(() => Envio, (envio) => envio.sucursalDestino)
  enviosDestinados!: Envio[];

  @ApiProperty({
    description: 'Empleados en esta sucursal',
    type: () => [Empleado],
    isArray: true
  })
  @OneToMany(() => Empleado, (empleado) => empleado.sucursal)
  empleados!: Empleado[];
}
