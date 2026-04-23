import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Envio } from '../../envio/entities/envio.entity';
import { Factura } from '../../factura/entities/factura.entity';

@Entity('pago')
export class Pago {
  @ApiProperty({ description: 'ID único del pago', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Envío asociado', type: () => Envio })
  @ManyToOne(() => Envio, (envio) => envio.pagos)
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @ApiProperty({ description: 'ID del envío' })
  @Column({ name: 'envio_id', nullable: true })
  envioId!: number;

  @ApiProperty({ description: 'Monto del pago', example: 50, nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto!: number;

  @ApiProperty({ description: 'Método de pago', example: 'Efectivo', maxLength: 50, nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  metodo!: string;

  @ApiProperty({ description: 'Fecha del pago' })
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'NOW()' })
  fecha!: Date;

  @ApiProperty({ description: 'Factura asociada', type: () => Factura, nullable: true })
  @OneToOne(() => Factura, (factura) => factura.pago)
  factura!: Factura;
}