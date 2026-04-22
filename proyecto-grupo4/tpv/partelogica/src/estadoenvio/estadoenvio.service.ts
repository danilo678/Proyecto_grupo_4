import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoEnvio } from './estadoenvio';

@Injectable()
export class EstadoEnvioService {

    constructor(
        
        @InjectRepository(EstadoEnvio)
        private estadoEnvioRepository: Repository<EstadoEnvio>

    ) {}  

    async findAll(): Promise<EstadoEnvio[]> {
        return await this.estadoEnvioRepository.find();
    }

}
