import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tipo_paquete')
export class TipoPaquete {
  @ApiProperty({ description: 'ID único del tipo de paquete', example: 1, type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'Nombre del tipo', example: 'Caja', maxLength: 50 })
  @Column({ type: 'varchar', length: 50, nullable: true })
  nombre!: string;

  @ApiProperty({ description: 'Descripción del tipo', example: 'Caja de cartón', nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion!: string;
}