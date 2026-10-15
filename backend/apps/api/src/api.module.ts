import { KafkaModule } from '@app/kafka';
import { SharedService } from '@app/shared';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { JobsModule } from './jobs/jobs.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/api/.env.local', '.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        return { uri };
      },
    }),
    KafkaModule.forRootAsync({ name: 'SEARCH_KAFKA_SERVICE' }),
    JobsModule,
    SearchModule,
  ],
  controllers: [ApiController],
  providers: [ApiService, SharedService],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
