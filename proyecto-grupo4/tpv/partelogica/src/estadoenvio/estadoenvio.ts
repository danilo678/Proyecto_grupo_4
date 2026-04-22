import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EstadoEnvio')
export class EstadoEnvio{
     @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

}
