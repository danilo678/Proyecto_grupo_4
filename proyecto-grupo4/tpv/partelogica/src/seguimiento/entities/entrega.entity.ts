import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Envio } from '../../envio/entities/envio.entity';

@Entity('entrega')
export class Entrega {
  @ApiProperty({ description: 'ID único de la entrega', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Envío asociado', type: () => Envio })
  @OneToOne(() => Envio, (envio) => envio.entrega)
  @JoinColumn({ name: 'envio_id' })
  envio!: Envio;

  @ApiProperty({ description: 'ID del envío' })
  @Column({ name: 'envio_id', unique: true, nullable: true })
  envioId!: number;

  @ApiProperty({ description: 'Fecha de entrega', nullable: true })
  @Column({ name: 'fecha_entrega', type: 'timestamp', nullable: true })
  fechaEntrega!: Date;

  @ApiProperty({ description: 'Nombre de quien recibe', example: 'Juan Perez', maxLength: 100, nullable: true })
  @Column({ name: 'nombre_recibe', type: 'varchar', length: 100, nullable: true })
  nombreRecibe!: string;

  @ApiProperty({ description: 'Cédula de quien recibe', example: '123456', maxLength: 20, nullable: true })
  @Column({ name: 'ci_recibe', type: 'varchar', length: 20, nullable: true })
  ciRecibe!: string;

  @ApiProperty({ description: 'Firma de quien recibe', nullable: true })
  @Column({ type: 'text', nullable: true })
  firma!: string;
}