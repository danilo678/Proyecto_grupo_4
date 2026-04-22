import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { usuario } from './usuario';


@Injectable()
export class UsuarioService {
    constructor(
            
        @InjectRepository(usuario)            
        private estadoEnvioRepository: Repository<usuario>  
        ) {}  
    
        async findAll(): Promise<usuario[]> {
            return await this.estadoEnvioRepository.find();
        }
}
