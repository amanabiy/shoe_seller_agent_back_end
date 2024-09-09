import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with default settings
  app.enableCors({
    origin: '*', // Allows all origins. Change this to a specific domain or array of domains as needed.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
