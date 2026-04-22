import { Controller, Get } from '@nestjs/common';
import { TipopaqueteService } from './tipopaquete.service';

@Controller('api/v1/tipopaquete')
export class TipopaqueteController {

    constructor(

        private readonly tipopaqueteservice: TipopaqueteService  
    ) {}

    @Get()
    async findAll() {
        return await this.tipopaqueteservice.findall();
    }
}
