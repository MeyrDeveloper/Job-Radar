import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  // validation dto
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get('KAFKA_CLIENT_ID', 'API_CLIENT'),
        brokers: [configService.get('KAFKA_URI', '127.0.0.1:9092')],
      },
      consumer: {
        groupId: configService.get('KAFKA_GROUP_ID', 'KAFKA_API_GROUP'),
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
