import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SchoolStatus } from 'src/enum';

export class SchoolDetailDto {
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  schoolName: string;


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

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  schoolDesc: string;


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
  keyword?: string;

}

export class UpdateSubAdminDto{

}
