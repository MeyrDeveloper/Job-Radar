import { KafkaService } from '@app/kafka';
import { KAFKA_EVENT_JOB_FOUND } from '@app/kafka/domain/constant';
import { KafkaRequestPayloadType } from '@app/kafka/dto/create-kafka.dto';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RemoteOkSource } from './scraper/sources/remote.source.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly remoteOkSource: RemoteOkSource,
  ) {}
  async processSearchRequest(
    message: Partial<KafkaRequestPayloadType>,
  ): Promise<number> {
    this.logger.log(`The consumer ${message.query} send a query`);

    const jobs = await this.remoteOkSource.searchRemoteOk(
      message.query ?? 'query-test',
      message.location ?? 'test',
    );

    for (const job of jobs) {
      await firstValueFrom(
        this.kafkaService.createEvent(KAFKA_EVENT_JOB_FOUND, {
          searchId: message.searchId,
          source: job.source,
          title: job.title,
          location: job.location,
          url: job.url,
          externalId: job.externalId,
          company: job.company,
        }),
      );
    }
    this.logger.log(`finished consumer scrapping`);

    return jobs.length;
  }
}
