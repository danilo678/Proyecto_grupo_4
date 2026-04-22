import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Cliente } from '../cliente.entity';

@Entity('contacto_cliente')
export class Contacto {
  @ApiProperty({ 
    description: 'ID único del contacto (autoincremental)', 
    example: 1,
    type: Number
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    description: 'ID del cliente al que pertenece el contacto', 
    type: Number, 
    example: 1
  })
  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ApiProperty({ 
    description: 'Tipo de contacto (ej: Emergencia, Familiar, Trabajo)', 
    maxLength: 50, 
    example: 'Emergencia',
    enum: ['Emergencia', 'Familiar', 'Trabajo', 'Otro']
  })
  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @ApiProperty({ 
    description: 'Nombre completo del contacto', 
    maxLength: 100, 
    example: 'Ana Perez'
  })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ 
    description: 'Teléfono de contacto', 
    maxLength: 20, 
    example: '70000001',
    nullable: true
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @ApiHideProperty()
  @ManyToOne(() => Cliente, (cliente) => cliente.contactos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
