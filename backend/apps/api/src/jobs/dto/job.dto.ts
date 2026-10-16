import { Job } from '@app/database/schemas/job.schema';
import { PaginationResponseDto } from '@app/shared/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class JobItemResponseDto extends Job {
  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;

  @Exclude()
  _id: any;

  @Exclude()
  __v: number;

  constructor(partial: Partial<JobItemResponseDto>) {
    super();

    Object.assign(this, partial);
  }
}

export class RawJobResponseDto extends PaginationResponseDto<JobItemResponseDto> {}

export class JobResponseDto extends RawJobResponseDto {
  @IsString()
  searchId: string;

  constructor(partial: Partial<JobResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}

export class JobsWithCount {
  @IsNumber()
  total: number;

  @IsArray()
  items: JobItemResponseDto[];
}
