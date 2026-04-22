import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEnvioModule } from './estado-envio/estado-envio.module';
import { UsuarioModule } from './usuario/usuario.module';


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
    UsuarioModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
