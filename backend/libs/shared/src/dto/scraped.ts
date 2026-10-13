import { IsString } from 'class-validator';

export class ScrapedJobDto {
  @IsString()
  source: string;

  @IsString()
  externalId: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  @IsString()
  url: string;
}
