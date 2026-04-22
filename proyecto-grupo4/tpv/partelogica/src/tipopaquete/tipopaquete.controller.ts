import { Controller, Get } from '@nestjs/common';
import { TipopaqueteService } from './tipopaquete.service';
import { Tipopaquete } from './tipopaquete';
import { get } from 'http';


@Controller('api/v1/tipopaquete')
export class tipopaquetecontroller {

    constructor(

        private readonly clienteService: TipopaqueteService

    ) {}

    @Get()
    async findAll(): Promise<Tipopaquete[]> {

        return await this.clienteService.findall();
        
    }
}
