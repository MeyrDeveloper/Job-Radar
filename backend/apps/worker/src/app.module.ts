import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [KafkaModule.forRootAsync({ name: 'WORKER_KAFKA_SERVICE' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
