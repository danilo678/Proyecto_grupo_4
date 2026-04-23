import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Encomienda } from './encomienda.entity';

@Entity('seguro')
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'encomienda_id', unique: true })
  encomiendaId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column('text', { nullable: true })
  descripcion: string;

  @OneToOne(() => Encomienda, (encomienda) => encomienda.seguro)
  @JoinColumn({ name: 'encomienda_id' })
  encomienda: Encomienda;
}
