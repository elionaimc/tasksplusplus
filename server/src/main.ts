import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // Create a NestJS application instance by passing the AppModule to the NestFactory
  const app = await NestFactory.create(AppModule);

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Tasks++ API') // Set the title of the API
    .setDescription('Describes the Tasks++ API') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .build(); // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app,config);

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/v1', app, document);
  app.enableCors(); 
  // Start the application and listen for requests on port 3000
  await app.listen(3000);
}
bootstrap();
