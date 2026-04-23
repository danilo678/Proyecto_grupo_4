import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pago } from '../../pago/entities/pago.entity';

@Entity('factura')
export class Factura {
  @ApiProperty({ description: 'ID único de la factura', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Pago asociado', type: () => Pago })
  @OneToOne(() => Pago, (pago) => pago.factura)
  @JoinColumn({ name: 'pago_id' })
  pago!: Pago;

  @ApiProperty({ description: 'ID del pago' })
  @Column({ name: 'pago_id', unique: true, nullable: true })
  pagoId!: number;

  @ApiProperty({ description: 'Número de factura', example: 'F001', maxLength: 50, nullable: true })
  @Column({ name: 'numero_factura', type: 'varchar', length: 50, nullable: true })
  numeroFactura!: string;

  @ApiProperty({ description: 'NIT del cliente', example: '1234567', maxLength: 20, nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  nit!: string;

  @ApiProperty({ description: 'Razón social', example: 'Juan Perez', maxLength: 150, nullable: true })
  @Column({ name: 'razon_social', type: 'varchar', length: 150, nullable: true })
  razonSocial!: string;

  @ApiProperty({ description: 'Fecha de emisión' })
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'NOW()' })
  fecha!: Date;
}