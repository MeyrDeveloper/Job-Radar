import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { SEARCH_STATUS } from '../../../../../libs/shared/src/types/search';

export class CreateRequestSearchDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  query: string;

  @IsString()
  location: string;
}

export class CreateResponseSearchDto {
  @IsString()
  @IsNotEmpty()
  searchId: string;

  @IsEnum(SEARCH_STATUS)
  @IsNotEmpty()
  status: SEARCH_STATUS;
}

export class CreateResponseSearchByIdDto extends CreateResponseSearchDto {
  @IsNumber()
  jobs: number;
}
