import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SearchResult,
  SearchResultDocument,
} from '../search/schema/searchResult.schema';
import { Job, JobDocument } from './schema/job.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @InjectModel(SearchResult.name)
    private readonly searchResult: Model<SearchResultDocument>,
  ) {}

  async saveJob(job: Partial<Job>, searchId: string) {
    const savedJob = await this.jobModel.findOneAndUpdate(
      {
        source: job.source,
        externalId: job.externalId,
      },
      { $setOnInsert: job },
      { upsert: true, new: true },
    );
    await this.searchResult.findOneAndUpdate(
      {
        jobId: savedJob._id,
        searchId,
      },
      { $setOnInsert: { searchId, jobId: savedJob._id } },
      { upsert: true },
    );
  }

  async findSavedJobs(id: string) {
    const findedSearchResult = await this.searchResult
      .find({ searchId: id })
      .lean()
      .exec();

    const jobIds = findedSearchResult.map((item) => item.jobId);

    return await this.jobModel
      .find({ _id: { $in: jobIds } })
      .lean()
      .exec();
  }
}
