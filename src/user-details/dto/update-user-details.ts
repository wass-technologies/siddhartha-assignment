import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDetailDto {
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  email: string;


  @IsOptional()
  accountId: string;
}

export class PaginationSDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  keyword: string;
}
