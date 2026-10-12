import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schema/job.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
  ) {}

  async saveJob(job: Partial<Job>) {
    return this.jobModel.updateOne(
      {
        source: job.source,
        externalId: job.externalId,
        location: job.location,
      },
      { $setOnInsert: job },
      { upsert: true },
    );
  }

  async findSavedJobs(id: string) {
    return this.jobModel.find({ searchId: id }).lean().exec();
  }
}
