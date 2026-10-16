import { KAFKA_EVENT_JOB_FOUND } from '@app/kafka/domain/constant';
import { PaginationRequestDto } from '@app/shared/dto/page.dto';
import { ScrapedJobDto } from '@app/shared/dto/scraped.dto';
import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JobResponseDto, RawJobResponseDto } from './dto/job.dto';
import { JobsService } from './jobs.service';
import { JobFilterParamsType } from './types/job';

@Controller('jobs')
export class JobsController {
  private readonly logger = new Logger(JobsController.name);
  constructor(private readonly jobsService: JobsService) {}

  @EventPattern(KAFKA_EVENT_JOB_FOUND)
  async saveFoundedJob(@Payload() message: Partial<ScrapedJobDto>) {
    const { searchId, ...restMessage } = message;

    await this.jobsService.saveJob(restMessage, searchId ?? '');
    this.logger.log('Searched job is saved');
  }

  @Get()
  async getAllJobs(
    @Query() paginationQuery: PaginationRequestDto & JobFilterParamsType,
  ): Promise<RawJobResponseDto> {
    const jobs = await this.jobsService.findAllJobs(paginationQuery);

    return {
      items: jobs.items,
      total: jobs.total,
      page: paginationQuery?.page ?? 1,
      limit: paginationQuery?.limit ?? 10,
      totalPages: Math.ceil(jobs.total / (paginationQuery?.limit ?? 10)),
    };
  }

  @Get(':searchId')
  async searchJobsBySearchId(
    @Param('searchId') searchId: string,
    @Query() paginationQuery: PaginationRequestDto,
  ): Promise<JobResponseDto> {
    const jobs = await this.jobsService.findSavedJobsBySearchId(
      searchId,
      paginationQuery,
    );

    return {
      searchId,
      items: jobs.items,
      total: jobs.total,
      page: paginationQuery?.page ?? 1,
      limit: paginationQuery?.limit ?? 10,
      totalPages: Math.ceil(jobs.total / (paginationQuery?.limit ?? 10)),
    };
  }
}
