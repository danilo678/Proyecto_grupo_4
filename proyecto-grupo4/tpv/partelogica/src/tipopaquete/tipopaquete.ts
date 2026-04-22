import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TipoPaquete')
export class Tipopaquete {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

}
