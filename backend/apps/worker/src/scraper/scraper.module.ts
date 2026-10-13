import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { RemoteOkSource } from './sources/remote.source.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, RemoteOkSource],
  exports: [ScraperService, RemoteOkSource],
})
export class ScraperModule {}
