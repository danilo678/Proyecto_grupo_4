import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuario } from './usuario';


@Module({
  imports: [TypeOrmModule.forFeature([usuario])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
