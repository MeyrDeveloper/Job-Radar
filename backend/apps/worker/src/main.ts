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
          clientId: 'api',
          brokers: [`${process.env.KAFKA_URI}`],
        },
        consumer: {
          groupId: 'api-group',
        },
      },
    },
  );
  await app.listen();
}
await bootstrap();
