import { IsArray, IsString } from 'class-validator';

export class PageJobDto {
  @IsString()
  @IsArray()
  items: string;
}
