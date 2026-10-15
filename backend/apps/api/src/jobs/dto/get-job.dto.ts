import { Job } from '@app/database/schemas/job.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

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

    // if (partial && (partial as any)._id) {
    //   this.id = (partial as any)._id.toString();
    // }

    // delete (this as any)._id;
    // delete (this as any).__v;
  }
}

export class JobResponseDto {
  @IsString()
  searchId: string;

  @IsInt()
  jobsCount: number;

  @ValidateNested({ each: true })
  @Type(() => JobItemResponseDto)
  jobs: JobItemResponseDto[];
}
