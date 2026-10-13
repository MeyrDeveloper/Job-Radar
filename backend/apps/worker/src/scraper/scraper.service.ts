import { parseJobs } from '@app/shared/scraped/scrapedJob';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { UpdateScraperDto } from './dto/update-scraper.dto';

@Injectable()
export class ScraperService {
  async scraperFixture() {
    const html = await readFile(
      join(process.cwd(), 'apps/worker/src/scraper/example/test.job.html'),
      'utf-8',
    );

    return parseJobs(html, 'https://example.com', 'demo');
  }

  findOne(id: number) {
    return `This action returns a #${id} scraper`;
  }

  update(id: number, updateScraperDto: UpdateScraperDto) {
    return `This action updates a #${id} scraper`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraper`;
  }
}
