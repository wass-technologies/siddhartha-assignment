import { PartialType } from '@nestjs/swagger';
import { CreateStaffDetailDto } from './create-staff-detail.dto';

import { IsOptional, IsString, IsUUID, IsEmail, IsDate, IsNumber } from 'class-validator';

export class UpdateStaffDetailDto {
  @IsNumber()
  id: number; 
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  address1?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;
}

