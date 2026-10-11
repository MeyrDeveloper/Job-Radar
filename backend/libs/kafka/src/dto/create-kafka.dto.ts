import { IsString } from 'class-validator';

export class CreateKafkaDto {
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
