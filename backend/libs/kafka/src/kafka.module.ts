import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

type KafkaModuleProperties = {
  name: string;
};

@Global()
@Module({})
export class KafkaModule {
  static forRootAsync(options: KafkaModuleProperties): DynamicModule {
    return {
      module: KafkaModule,

      imports: [
        ConfigModule,
        ClientsModule.registerAsync([
          {
            name: options.name,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: configService.get<string>('KAFKA_CLIENT_ID'),
                  brokers: [
                    configService.get<string>('KAFKA_URI', '127.0.0.1:9092') ||
                      '127.0.0.1:9092',
                  ],
                },
                consumer: {
                  groupId:
                    configService.get<string>('KAFKA_GROUP_ID') ||
                    'nest-kafka-consumer-group',
                },
                producerOnlyMode:
                  configService.get<boolean>('KAFKA_PRODUCER_MODE') || false,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [
        {
          provide: KafkaService,
          inject: [options.name],
          useFactory: (client: ClientKafka) => {
            return new KafkaService(client);
          },
        },
      ],
      exports: [ClientsModule, KafkaService],
    };
  }
}
