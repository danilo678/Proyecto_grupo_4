import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { usuario } from './usuario';
import { get } from 'http';

@Controller('api/v1/usuario')
export class UsuarioController {

    constructor(

        private readonly clienteService: UsuarioService

    ) {}

    @Get()
    async findAll(): Promise<usuario[]> {

        return await this.clienteService.findAll();
        
    }
}

