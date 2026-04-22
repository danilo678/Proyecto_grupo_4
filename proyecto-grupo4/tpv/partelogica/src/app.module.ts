import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEnvioModule } from './estadoenvio/estadoenvio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { TipopaqueteModule } from './tipopaquete/tipopaquete.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'tpvdb',
      autoLoadEntities: true,
      synchronize: true
    }),
    EstadoEnvioModule,
    UsuarioModule,
    ClienteModule,
    SucursalModule,
    TipopaqueteModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
