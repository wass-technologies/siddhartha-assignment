import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClassEntity, SchoolDetails, Student])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
