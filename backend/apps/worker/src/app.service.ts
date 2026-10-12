import { KafkaRequestPayloadType } from '@app/kafka/dto/create-kafka.dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async processSearchRequest(
    message: Partial<KafkaRequestPayloadType>,
  ): Promise<void> {
    this.logger.log(`The consumer ${message.query} send a query`);

    await new Promise((res) => setTimeout(res, 1000));

    this.logger.log(`finished consumer scrapping`);
  }
}
