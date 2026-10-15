import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service.js';
import { Job, JobSchema } from './schemas/job.schema.js';
import { Search, SearchSchema } from './schemas/search.schema';
import {
  SearchResult,
  SearchResultSchema,
} from './schemas/searchResult.schema.js';

const DATABASE_MODULES = [
  { name: Search.name, schema: SearchSchema },
  { name: SearchResult.name, schema: SearchResultSchema },
  { name: Job.name, schema: JobSchema },
];
@Module({
  imports: [MongooseModule.forFeature(DATABASE_MODULES)],
  providers: [DatabaseService],
  exports: [DatabaseService, MongooseModule],
})
export class DatabaseModule {}
