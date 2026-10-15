import { IsOptional, IsString } from 'class-validator';

export class ScrapedJobDto {
  @IsOptional()
  @IsString()
  searchId?: string;

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
