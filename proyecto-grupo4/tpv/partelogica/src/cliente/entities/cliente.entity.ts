import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';
import { Contacto } from './contacto/contacto.entity';

@Entity('cliente')
export class Cliente {
  @ApiProperty({ description: 'Identificador único del cliente' })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Nombre del cliente', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @ApiProperty({ description: 'Apellido del cliente', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  apellido!: string;

  @ApiProperty({
    description: 'Cédula de identidad del cliente',
    maxLength: 20,
  })
  @Column({ type: 'varchar', length: 20, unique: true })
  ci!: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    maxLength: 20,
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono!: string;

  @ApiProperty({ description: 'Correo electrónico', maxLength: 100 })
  @Column({ type: 'varchar', length: 100, nullable: true })
  email!: string;

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @Column({ type: 'text', nullable: true })
  direccion!: string;

  @ApiProperty({ description: 'Fecha de registro del cliente' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  fecha_registro!: Date;

  @ApiProperty({
    description: 'Sucursales asociadas al cliente',
    type: () => [Sucursal],
    example: [
      { id: 1, nombre: 'Sucursal Central' }
    ] 
  })
  @ManyToMany(() => Sucursal, (sucursal) => sucursal.clientes)
  @JoinTable({
    name: 'cliente_sucursal',
    joinColumn: { name: 'cliente_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sucursal_id', referencedColumnName: 'id' },
  })
  sucursales!: Sucursal[];

  @ApiProperty({
    description: 'Lista de contactos',
    type: () => [Contacto],
    isArray: true,
    example: [
      { id: 1, nombre: 'Ana Perez', tipo: 'Emergencia'}
    ]
  })
  @OneToMany(() => Contacto, (contacto) => contacto.cliente)
  contactos: Contacto[];
}
