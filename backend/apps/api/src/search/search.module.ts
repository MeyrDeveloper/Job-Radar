import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
