import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  // Global middleware
  await app.register(fastifyHelmet); // security headers
  await app.register(fastifyCors, {
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  await app.register(fastifyCompress); // gzip compression

  // Logging with Pino
  app.useLogger(app.get(Logger));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties
      forbidNonWhitelisted: true, // throw error if extra fields
      transform: true, // auto-transform payloads to DTOs
    }),
  );

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application running on http://localhost:${port}`);
}

bootstrap();
