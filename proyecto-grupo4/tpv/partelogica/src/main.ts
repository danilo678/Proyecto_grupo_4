import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Encomiendas')
    .setDescription('API para gestionar el sistema de encomiendas, envíos, pagos y facturas')
    .setVersion('1.0')
    .addTag('cliente')
    .addTag('sucursal')
    .addTag('encomienda')
    .addTag('envio')
    .addTag('seguimiento')
    .addTag('pago')
    .addTag('factura')
    .addTag('usuario')
    .addTag('empleado')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
