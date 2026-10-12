import { KafkaService } from '@app/kafka';
import {
  KAFKA_EVENT_COMPLETE,
  KAFKA_EVENT_REQUEST,
} from '@app/kafka/domain/constant';
import type {
  KafkaRequestPayloadType,
  KafkaResponsePayloadType,
} from '@app/kafka/dto/create-kafka.dto';
import { JOBS_SOURCES, SEARCH_STATUS } from '@app/shared/types/search';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger('Worker app controller');

  constructor(
    private readonly appService: AppService,
    private readonly kafkaService: KafkaService,
  ) {}

  @EventPattern(KAFKA_EVENT_REQUEST)
  async handleSearchRequested(
    @Payload() message: Partial<KafkaRequestPayloadType>,
  ): Promise<void> {
    const jobsCount = await this.appService.processSearchRequest(message);

    await firstValueFrom(
      this.kafkaService.createEvent<KafkaResponsePayloadType>(
        KAFKA_EVENT_COMPLETE,
        {
          eventId: `${message.eventId}:hh`,
          searchId: `${message.searchId}`,
          status: SEARCH_STATUS.COMPLETED,
          jobsFound: jobsCount,
          source: JOBS_SOURCES.hh,
          finishedAt: new Date().toISOString(),
        },
      ),
    );

    this.logger.log(`Published completion for ${message.searchId}`);
  }
}
