import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  // @MessagePattern('createScraper')
  // create(@Payload() createScraperDto: CreateScraperDto) {
  //   return this.scraperService.create(createScraperDto);
  // }

  // @MessagePattern('findAllScraper')
  // findAll() {
  //   return this.scraperService.findAll();
  // }

  @MessagePattern('findOneScraper')
  findOne(@Payload() id: number) {
    return this.scraperService.findOne(id);
  }

  @MessagePattern('updateScraper')
  update(@Payload() updateScraperDto: UpdateScraperDto) {
    return this.scraperService.update(updateScraperDto.id, updateScraperDto);
  }

  @MessagePattern('removeScraper')
  remove(@Payload() id: number) {
    return this.scraperService.remove(id);
  }
}
