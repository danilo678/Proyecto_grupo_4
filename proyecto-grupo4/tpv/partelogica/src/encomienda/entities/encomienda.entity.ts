import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { DetalleEncomienda } from './detalle-encomienda.entity';
import { Seguro } from './seguro.entity';
import { Envio } from '../../envio/entities/envio.entity';

@Entity('encomienda')
export class Encomienda {
  @ApiProperty({ description: 'ID único generado por la base de datos', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Código de seguimiento único', example: 'ENC-2024-001' })
  @Column({ unique: true, length: 50 })
  codigo: string;

  @ApiProperty({ description: 'ID del cliente que envía', example: 1 })
  @Column({ name: 'remitente_id' })
  remitenteId: number;

  @ApiProperty({ description: 'ID del cliente que recibe', example: 2 })
  @Column({ name: 'destinatario_id' })
  destinatarioId: number;

  @ApiProperty({ description: 'Descripción del contenido del paquete', example: 'Documentos legales y laptop' })
  @Column('text', { nullable: true })
  descripcion: string;

  @ApiProperty({ description: 'Peso total en kilogramos', example: 5.50 })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  peso: number;

  @ApiProperty({ description: 'Volumen total en metros cúbicos', example: 0.15 })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  volumen: number;

  @ApiProperty({ description: 'Valor económico declarado para seguros', example: 500.00 })
  @Column('decimal', { name: 'valor_declarado', precision: 10, scale: 2, nullable: true })
  valorDeclarado: number;

  @ApiProperty({ description: 'Fecha y hora de registro automático', example: '2024-04-22T10:00:00Z' })
  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'remitente_id' })
  remitente: Cliente;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'destinatario_id' })
  destinatario: Cliente;

  @ApiProperty({ type: () => [DetalleEncomienda], description: 'Desglose de paquetes incluidos' })
  @OneToMany(() => DetalleEncomienda, (detalle) => detalle.encomienda, { 
    cascade: true,
    onDelete: 'CASCADE'
  })
  detalles: DetalleEncomienda[];

  @ApiProperty({ type: () => Seguro, description: 'Información del seguro asociado', required: false })
  @OneToOne(() => Seguro, (seguro) => seguro.encomienda, { 
    cascade: true,
    onDelete: 'CASCADE'
  })
  seguro: Seguro;

  @OneToOne(() => Envio, (envio) => envio.encomienda)
  envio: Envio;
}
