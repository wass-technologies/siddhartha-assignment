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
  IsEnum,
  IsEmail,
  IsArray,
} from 'class-validator';
import { SchoolStatus } from 'src/enum';

export class SchoolDto {

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsEmail()
  @MinLength(0)
  @MaxLength(50)
  email: string;


  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  city: string;
  
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  area: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  address1: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  address2: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  pincode: string;

}

export class StatusDto {
  @IsNotEmpty()
  @IsEnum(SchoolStatus)
  status: SchoolStatus;
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

  @IsNotEmpty()
  @IsEnum(SchoolStatus)
  status: SchoolStatus;
}

export class PaginationDto {
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
