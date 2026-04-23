import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Envio } from '../../envio/entities/envio.entity';
import { Seguimiento } from '../../seguimiento/entities/seguimiento.entity';

@Entity('estado_envio')
export class EstadoEnvio {
  @ApiProperty({ description: 'ID único del estado', example: 1, type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'Nombre del estado', example: 'Registrado', maxLength: 50 })
  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @ApiProperty({ description: 'Envíos con este estado', type: () => [Envio] })
  @OneToMany(() => Envio, (envio) => envio.estado)
  envios!: Envio[];

  @ApiProperty({ description: 'Seguimientos con este estado', type: () => [Seguimiento] })
  @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.estado)
  seguimientos!: Seguimiento[];
}