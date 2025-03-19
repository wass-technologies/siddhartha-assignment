import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

    export class UpdateStudentDto  {
  
        @IsOptional()
        @IsInt()
        age?: number;
      
        @IsOptional()
        @IsString()
        gender?: string;
      
        @IsOptional()
        @IsString()
        address?: string;
      
      
        @IsOptional()
        classId?: number;
    
    }
