import { Search } from '@app/database/schemas/search.schema';
import { PaginationResponseDto } from '@app/shared/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SearchItemResponseDto extends Search {
  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;

  @Exclude()
  _id: any;

  @Exclude()
  __v: number;

  constructor(partial: Partial<SearchItemResponseDto>) {
    super();

    Object.assign(this, partial);
  }
}

export class GetSearchResponseDto extends PaginationResponseDto<SearchItemResponseDto> {
  constructor(partial: Partial<GetSearchResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
