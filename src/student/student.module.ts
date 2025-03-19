import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { ClassEntity } from 'src/class/entities/class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student,SchoolDetails,ClassEntity])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
