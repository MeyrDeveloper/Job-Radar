import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @EventPattern(process.env.KAFKA_SERVICE || 'jobradar.search.requested')
  async heandleSearchRequested(@Payload() message: SearchRequestedEvent) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
