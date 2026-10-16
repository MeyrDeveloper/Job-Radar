import { Job, JobDocument } from '@app/database/schemas/job.schema';
import {
  SearchResult,
  SearchResultDocument,
} from '@app/database/schemas/searchResult.schema';
import { PaginationRequestDto, SortValue } from '@app/shared/dto/page.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { JobItemResponseDto, JobsWithCount } from './dto/job.dto';
import { JobFilterParamsType } from './types/job';
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

  async findSavedJobsBySearchId(
    id: string,
    { page = 1, limit = 10 }: PaginationRequestDto,
  ): Promise<JobsWithCount> {
    const skip = (page - 1) * limit;
    const searchObjectId = new Types.ObjectId(id);

    const findedSearchResult = await this.searchResult
      .find({ searchId: searchObjectId })
      .lean()
      .exec();

    const jobIds = findedSearchResult.map((item) => item.jobId);

    const [items, total] = await this.jobModel.findAndCount(
      { _id: { $in: jobIds } },
      null,
      {
        skip: skip,
        sort: 'DESC',
        limit,
        lean: true,
      },
    );

    return {
      total: total,
      items: plainToInstance(JobItemResponseDto, items),
    };
  }

  async findAllJobs({
    page = 1,
    limit = 10,
    sortBy = '_id',
    sortOrder = SortValue.DESC,
    ...filterParams
  }: PaginationRequestDto & JobFilterParamsType): Promise<JobsWithCount> {
    const skip = (page - 1) * limit;

    const filter: Partial<Record<keyof JobFilterParamsType, any>> = {};

    Object.entries(filterParams).forEach(([key, value]) => {
      filter[key as keyof JobFilterParamsType] = {
        $regex: value,
        $options: 'i',
      };
    });

    const [jobItems, total] = await Promise.all([
      this.jobModel
        .find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .lean()
        .exec(),
      this.jobModel.countDocuments(),
    ]);

    return {
      items: plainToInstance(JobItemResponseDto, jobItems),
      total,
    };
  }
}
