import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum SortValue {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationResponseDto<T> {
  @IsString()
  @IsArray()
  items: Array<T>;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsInt()
  total: number;

  @IsInt()
  totalPages: number;
}

export class PaginationRequestDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = '_id';

  @IsOptional()
  @IsIn([SortValue.ASC, SortValue.DESC])
  @IsEnum(SortValue)
  sortOrder?: SortValue = SortValue.DESC;
}
