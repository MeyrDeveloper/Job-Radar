import { KafkaModule } from '@app/kafka';
import { HttpModule } from '@nestjs/axios';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
