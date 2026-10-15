import { Job, JobDocument } from '@app/database/schemas/job.schema';
import {
  SearchResult,
  SearchResultDocument,
} from '@app/database/schemas/searchResult.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JobItemResponseDto } from './dto/get-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @InjectModel(SearchResult.name)
    private readonly searchResult: Model<SearchResultDocument>,
  ) {}

  async saveJob(job: Partial<Job>, searchId: string) {
    const searchObjectId = new Types.ObjectId(searchId);

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
        searchId: searchObjectId,
      },
      { $setOnInsert: { searchId: searchObjectId, jobId: savedJob._id } },
      { upsert: true },
    );
  }

  async findSavedJobs(id: string): Promise<JobItemResponseDto[]> {
    const searchObjectId = new Types.ObjectId(id);

    const findedSearchResult = await this.searchResult
      .find({ searchId: searchObjectId })
      .lean()
      .exec();

    const jobIds = findedSearchResult.map((item) => item.jobId);

    const findedModels = await this.jobModel
      .find({ _id: { $in: jobIds } })
      .lean()
      .exec();

    return findedModels.map((job) => new JobItemResponseDto(job));
  }
}
