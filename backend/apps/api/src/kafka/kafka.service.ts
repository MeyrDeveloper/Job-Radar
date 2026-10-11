import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  KAFKA_EVENT_SEND,
  KAFKA_SERVICE,
} from '../../../../libs/kafka/src/domain/constant';
import { CreateKafkaDto } from '../../../../libs/kafka/src/dto/create-kafka.dto';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async init() {
    await this.kafkaClient.connect();
  }

  sendMessage(payload: CreateKafkaDto) {
    this.kafkaClient.emit(KAFKA_EVENT_SEND, payload);
  }
}
