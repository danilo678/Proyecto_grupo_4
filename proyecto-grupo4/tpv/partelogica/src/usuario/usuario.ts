import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class usuario {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 50})
    nombre_usuario: string;  

    @Column({ type: 'string', select: false })

    @Column({ type: 'text', nullable: false, select: false }) 
    password: string;

    @Column({ length: 50})
    role: string;

    @Column({type: 'boolean', default: true})
    estado: boolean;

}

