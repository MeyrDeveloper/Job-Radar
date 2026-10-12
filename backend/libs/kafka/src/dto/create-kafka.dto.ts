import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JOBS_SOURCES, SEARCH_STATUS } from '../../../shared/src/types/search';

export class CreateKafkaRequestDto {
  @IsString()
  eventId: string;

  @IsString()
  eventType: string;

  @IsString()
  searchId: string;

  @IsString()
  query: string;

  @IsString()
  location: string;

  @IsString()
  createdAt: Date;
}

export type KafkaRequestPayloadType = InstanceType<
  typeof CreateKafkaRequestDto
>;

export class CreateKafkaResponseDto {
  @IsString()
  eventId: string;

  @IsString()
  searchId: string;

  @IsNumber()
  jobsFound: number;

  @IsEnum(SEARCH_STATUS)
  status: SEARCH_STATUS;

  @IsEnum(JOBS_SOURCES)
  source: JOBS_SOURCES;

  @IsString()
  finishedAt: string;
}

export type KafkaResponsePayloadType = InstanceType<
  typeof CreateKafkaResponseDto
>;
