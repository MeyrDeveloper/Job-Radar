import { KAFKA_EVENT_JOB_FOUND } from '@app/kafka/domain/constant';
import { ScrapedJobDto } from '@app/shared/dto/scraped';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';

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

  @Get(':searchId')
  async searchJobsBySearchId(@Param('searchId') searchId: string) {
    const jobs = await this.jobsService.findSavedJobs(searchId);

    return {
      searchId,
      jobsCount: jobs.length,
      jobs,
    };
  }
}
