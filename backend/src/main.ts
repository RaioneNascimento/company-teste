import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Company API')
    .setDescription('The Company API description')
    .setVersion('1.0')
    .addTag('company')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT ?? 3000;

  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger is available on http://localhost:${port}/api`);

  await app.listen(port);
}

bootstrap();
