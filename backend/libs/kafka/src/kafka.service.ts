import { Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(private readonly kafkaClient: ClientKafka) {}

  async init() {
    try {
      await this.kafkaClient.connect();
      this.logger.log('Kafka connected successfully.');
    } catch (e) {
      this.logger.error('Failed to connect to Kafka', e);
    }
  }

  createEvent<T>(eventType: string, payload: T) {
    return this.kafkaClient.emit(eventType, payload);
  }
}
