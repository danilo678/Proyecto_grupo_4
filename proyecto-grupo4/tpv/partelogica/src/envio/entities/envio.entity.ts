import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Encomienda } from '../../encomienda/entities/encomienda.entity';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';
import { EstadoEnvio } from '../../common/entities/estado-envio.entity';
import { Seguimiento } from '../../seguimiento/entities/seguimiento.entity';
import { Entrega } from '../../seguimiento/entities/entrega.entity';
import { Pago } from '../../pago/entities/pago.entity';

@Entity('envio')
export class Envio {
  @ApiProperty({ description: 'ID único del envío', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Encomienda asociada', type: () => Encomienda })
  @OneToOne(() => Encomienda, (encomienda) => encomienda.envio)
  @JoinColumn({ name: 'encomienda_id' })
  encomienda!: Encomienda;

  @ApiProperty({ description: 'ID de la encomienda' })
  @Column({ name: 'encomienda_id', unique: true, nullable: true })
  encomiendaId!: number;

  @ApiProperty({ description: 'Sucursal de origen', type: () => Sucursal })
  @ManyToOne(() => Sucursal, (sucursal) => sucursal.enviosOriginados)
  @JoinColumn({ name: 'sucursal_origen_id' })
  sucursalOrigen!: Sucursal;

  @ApiProperty({ description: 'ID de la sucursal de origen' })
  @Column({ name: 'sucursal_origen_id', nullable: true })
  sucursalOrigenId!: number;

  @ApiProperty({ description: 'Sucursal de destino', type: () => Sucursal })
  @ManyToOne(() => Sucursal, (sucursal) => sucursal.enviosDestinados)
  @JoinColumn({ name: 'sucursal_destino_id' })
  sucursalDestino!: Sucursal;

  @ApiProperty({ description: 'ID de la sucursal de destino' })
  @Column({ name: 'sucursal_destino_id', nullable: true })
  sucursalDestinoId!: number;

  @ApiProperty({ description: 'Fecha de envío', nullable: true })
  @Column({ name: 'fecha_envio', type: 'timestamp', nullable: true })
  fechaEnvio!: Date;

  @ApiProperty({ description: 'Fecha estimada de entrega', nullable: true })
  @Column({ name: 'fecha_estimada', type: 'timestamp', nullable: true })
  fechaEstimada!: Date;

  @ApiProperty({ description: 'Costo del envío', example: 50, nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo!: number;

  @ApiProperty({ description: 'Estado del envío', type: () => EstadoEnvio })
  @ManyToOne(() => EstadoEnvio, (estado) => estado.envios)
  @JoinColumn({ name: 'estado_id' })
  estado!: EstadoEnvio;

  @ApiProperty({ description: 'ID del estado' })
  @Column({ name: 'estado_id', nullable: true })
  estadoId!: number;

  @ApiProperty({ description: 'Historial de seguimiento', type: () => [Seguimiento] })
  @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.envio)
  seguimientos!: Seguimiento[];

  @ApiProperty({ description: 'Información de entrega', type: () => Entrega, nullable: true })
  @OneToOne(() => Entrega, (entrega) => entrega.envio)
  entrega!: Entrega;

  @ApiProperty({ description: 'Pagos asociados al envío', type: () => [Pago], isArray: true })
  @OneToMany(() => Pago, (pago) => pago.envio)
  pagos!: Pago[];
}