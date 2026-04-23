import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';

@Entity('empleado')
export class Empleado {
  @ApiProperty({ description: 'ID único del empleado', example: 1, type: Number })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ description: 'Nombre del empleado', example: 'Luis', maxLength: 100, nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre!: string;

  @ApiProperty({ description: 'Apellido del empleado', example: 'Gomez', maxLength: 100, nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  apellido!: string;

  @ApiProperty({ description: 'Cargo del empleado', example: 'Cajero', maxLength: 100, nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  cargo!: string;

  @ApiProperty({ description: 'Teléfono del empleado', example: '77788888', maxLength: 20, nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono!: string;

  @ApiProperty({ description: 'Sucursal donde trabaja', type: () => Sucursal, nullable: true })
  @ManyToOne(() => Sucursal, (sucursal) => sucursal.empleados)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal!: Sucursal;

  @ApiProperty({ description: 'ID de la sucursal' })
  @Column({ name: 'sucursal_id', nullable: true })
  sucursalId!: number;
}