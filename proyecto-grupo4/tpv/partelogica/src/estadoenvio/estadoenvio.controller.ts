import { Controller, Get } from '@nestjs/common';
import { EstadoEnvioService } from './estadoenvio.service';
import { EstadoEnvio } from './estadoenvio';

@Controller('api/v1/estadoenvioooofeimf')
export class EstadoEnvioController {

    constructor(

        private readonly clienteService: EstadoEnvioService

    ) {}

    @Get()
    async findAll(): Promise<EstadoEnvio[]> {

        return await this.clienteService.findAll();
        
    }
}
