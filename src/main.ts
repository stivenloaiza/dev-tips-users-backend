// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api', { exclude: ['/'] });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Tips Users')
    .setDescription('registration of users to subscriptions - Tips Users.')
    .setVersion('1.0')
    .addTag('Tips Users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor iniciado en http://localhost:${port}`);
  console.log(
    `Documentación de la API disponible en http://localhost:${port}/api`,
  );
}

bootstrap();
