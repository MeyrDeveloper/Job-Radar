import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Search, SearchSchema } from './schema/search.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Search.name, schema: SearchSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
