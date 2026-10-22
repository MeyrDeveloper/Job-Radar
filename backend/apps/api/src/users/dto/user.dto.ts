import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {}

export class ResponseUserDto {
  @IsString()
  @IsEmail({}, { message: 'Pass proper email' })
  email: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatarUrl?: string;
}
