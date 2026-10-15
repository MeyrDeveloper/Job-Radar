import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
