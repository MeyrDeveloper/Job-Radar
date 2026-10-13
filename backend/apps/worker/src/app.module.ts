import { KafkaModule } from '@app/kafka';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ScraperModule } from './scraper/scraper.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    KafkaModule.forRootAsync({ name: 'WORKER_KAFKA_SERVICE' }),
    HttpModule.register({
      global: true,
    }),
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
