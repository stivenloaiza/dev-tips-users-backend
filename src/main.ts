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

  const config = new DocumentBuilder()
    .setTitle('Tips Users')
    .setDescription('registration of users to subscriptions - Tips Users.')
    .setVersion('1.0')
    .addTag('Tips Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: http://localhost:3000/v1/api`);
}
bootstrap();
