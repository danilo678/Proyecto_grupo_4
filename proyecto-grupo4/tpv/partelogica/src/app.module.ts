import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { EncomiendaModule } from './encomienda/encomienda.module';
import { EnvioModule } from './envio/envio.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { PagoModule } from './pago/pago.module';
import { FacturaModule } from './factura/factura.module';
import { CommonModule } from './common/common.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Sucursal } from './sucursal/entities/sucursal.entity';
import { Contacto } from './cliente/entities/contacto/contacto.entity';
import { Encomienda } from './encomienda/entities/encomienda.entity';
import { DetalleEncomienda } from './encomienda/entities/detalle-encomienda.entity';
import { Seguro } from './encomienda/entities/seguro.entity';
import { TipoPaquete } from './common/entities/tipo-paquete.entity';
import { EstadoEnvio } from './common/entities/estado-envio.entity';
import { Envio } from './envio/entities/envio.entity';
import { Seguimiento } from './seguimiento/entities/seguimiento.entity';
import { Entrega } from './seguimiento/entities/entrega.entity';
import { Usuario } from './common/entities/usuario.entity';
import { Empleado } from './common/entities/empleado.entity';
import { Pago } from './pago/entities/pago.entity';
import { Factura } from './factura/entities/factura.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123qwe',
      database: 'sgebd',
      entities: [
        Cliente,
        Sucursal,
        Contacto,
        Encomienda,
        DetalleEncomienda,
        Seguro,
        TipoPaquete,
        EstadoEnvio,
        Envio,
        Seguimiento,
        Entrega,
        Usuario,
        Empleado,
        Pago,
        Factura,
      ],
      synchronize: false,
      logging: false,
      extra: {
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      },
    }),
    ClienteModule,
    SucursalModule,
    EncomiendaModule,
    EnvioModule,
    SeguimientoModule,
    PagoModule,
    FacturaModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
