import { IsEnum, IsNumber, IsString } from 'class-validator';
import { SEARCH_STATUS } from '../../../../../libs/shared/src/types/search';

export class CreateRequestSearchDto {
  @IsString()
  query: string;

  @IsString()
  location: string;
}

export class CreateResponseSearchDto {
  @IsString()
  searchId: string;

  @IsEnum(SEARCH_STATUS)
  status: SEARCH_STATUS;
}

export class CreateResponseSearchByIdDto extends CreateResponseSearchDto {
  @IsNumber()
  jobs: number;
}
