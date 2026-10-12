import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    },
  );
  await app.listen();
}
await bootstrap();
