import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // validation dto
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [`${process.env.KAFKA_URI}`],
      },
      consumer: {
        groupId: `${process.env.KAFKA_GROUP_ID}`,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('The main appl API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
