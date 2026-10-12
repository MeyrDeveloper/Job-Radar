import { KafkaService } from '@app/kafka';
import { KAFKA_EVENT_REQUEST } from '@app/kafka/domain/constant';
import { KafkaResponsePayloadType } from '@app/kafka/dto/create-kafka.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { SEARCH_STATUS } from '../../../../libs/shared/src/types/search';
import {
  CreateRequestSearchDto,
  CreateResponseSearchByIdDto,
  CreateResponseSearchDto,
} from './dto/create-search.dto';
import { Search, SearchDocument } from './schema/search.schema';
import { SearchModule } from './search.module';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchModule.name);
  constructor(
    @InjectModel(Search.name) private searchModel: Model<SearchDocument>,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(
    createSearchDto: CreateRequestSearchDto,
  ): Promise<CreateResponseSearchDto> {
    const createdSearchDocument = new this.searchModel({
      ...createSearchDto,
      status: SEARCH_STATUS.PENDING,
      jobsFound: 0,
      createdAt: new Date(),
    });

    this.kafkaService.createEvent(KAFKA_EVENT_REQUEST, {
      ...createdSearchDocument.toObject(),
      eventId: randomUUID(),
      eventType: process.env.KAFKA_SERVICE ?? '',
      searchId: createdSearchDocument.id,
    });
    await createdSearchDocument.save();

    return {
      searchId: createdSearchDocument.id,
      status: SEARCH_STATUS.PENDING,
    };
  }

  findAll() {
    return this.searchModel.find();
  }

  async findOne(id: string): Promise<CreateResponseSearchByIdDto> {
    const findedSearch = await this.searchModel.findById(id);

    if (!findedSearch)
      throw new NotFoundException('Такого запроса не существует');

    return {
      searchId: findedSearch.id,
      status: findedSearch.status,
      jobs: findedSearch.jobsFound,
    };
  }

  async markSourceCompleted(payload: KafkaResponsePayloadType) {
    const search = await this.searchModel.findById(payload.searchId);

    if (!search) {
      this.logger.warn(`Search job with ${payload.searchId} not found`);
      return;
    }

    search.status = SEARCH_STATUS.COMPLETED;
    search.jobsFound += +payload.jobsFound;
    search.finishedAt = new Date();

    await search.save();
  }

  async findJobs(id: string) {}
}
