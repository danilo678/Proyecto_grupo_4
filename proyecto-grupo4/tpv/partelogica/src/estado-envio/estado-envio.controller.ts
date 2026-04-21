import { Controller, Get } from '@nestjs/common';
import { EstadoEnvioService } from './estado-envio.service';
import { EstadoEnvio } from './estado-envio';

@Controller('api/v1/estado-envio')
export class EstadoEnvioController {

    constructor(

        private readonly clienteService: EstadoEnvioService

    ) {}

    @Get()
    async findAll(): Promise<EstadoEnvio[]> {

        return await this.clienteService.findAll();
        
    }
}
