import { Entity } from "typeorm";

@Entity('EstadoEnvio')

export class EstadoEnvio {

    id: number;
    nombre: string;

}
