import { KAFKA_EVENT_COMPLETE } from '@app/kafka/domain/constant';
import type { CreateKafkaResponseDto } from '@app/kafka/dto/create-kafka.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateRequestSearchDto } from './dto/create-search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create(@Body() createSearchDto: CreateRequestSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @EventPattern(KAFKA_EVENT_COMPLETE)
  async handleWorkerComplete(
    @Payload() event: CreateKafkaResponseDto,
  ): Promise<void> {
    await this.searchService.markSourceCompleted(event);
  }

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
  //   return this.searchService.update(+id, updateSearchDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.searchService.remove(+id);
  // }
}
