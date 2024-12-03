import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Amaro API')
    .setDescription('The Amaro API description')
    .setVersion('1.0')
    .addTag('amaro')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT ?? 3000;

  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger is available on http://localhost:${port}/api`);

  await app.listen(port);
}

bootstrap();
