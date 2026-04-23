import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Envio } from '../../envio/entities/envio.entity';
import { EstadoEnvio } from '../../common/entities/estado-envio.entity';

@Entity('seguimiento')
export class Seguimiento {
  @ApiProperty({ description: 'ID único del seguimiento', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Envío asociado', type: () => Envio })
  @ManyToOne(() => Envio, (envio) => envio.seguimientos)
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @ApiProperty({ description: 'ID del envío' })
  @Column({ name: 'envio_id', nullable: true })
  envioId!: number;

  @ApiProperty({ description: 'Estado del envío', type: () => EstadoEnvio })
  @ManyToOne(() => EstadoEnvio, (estado) => estado.seguimientos)
  @JoinColumn({ name: 'estado_id' })
  estado!: EstadoEnvio;

  @ApiProperty({ description: 'ID del estado' })
  @Column({ name: 'estado_id', nullable: true })
  estadoId!: number;

  @ApiProperty({ description: 'Ubicación actual', example: 'La Paz', nullable: true })
  @Column({ type: 'text', nullable: true })
  ubicacion!: string;

  @ApiProperty({ description: 'Fecha del registro de seguimiento' })
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'NOW()' })
  fecha!: Date;

  @ApiProperty({ description: 'Observaciones', example: 'Transporte terrestre', nullable: true })
  @Column({ type: 'text', nullable: true })
  observaciones!: string;
}