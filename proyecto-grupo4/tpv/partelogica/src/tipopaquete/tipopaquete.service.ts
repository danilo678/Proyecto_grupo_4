import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipopaquete } from './tipopaquete';
import { Repository } from 'typeorm';


@Injectable()
export class TipopaqueteService {

    constructor(

        @InjectRepository(Tipopaquete)
        private readonly tipopaqueteRepository: Repository<Tipopaquete>


    ) {}

    async findall(): Promise<Tipopaquete[]> {
        return await this.tipopaqueteRepository.find(); 
    }
    
}