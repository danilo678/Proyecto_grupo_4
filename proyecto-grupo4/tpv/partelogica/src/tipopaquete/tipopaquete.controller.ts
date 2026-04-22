import { Controller, Get } from '@nestjs/common';
import { TipopaqueteService } from './tipopaquete.service';
import { Tipopaquete } from './tipopaquete';
<<<<<<< HEAD

=======
import { get } from 'http';
>>>>>>> 405daef3e1fb48427b439b9ae8d7034d800c569f

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
