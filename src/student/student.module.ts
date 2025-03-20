import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { School } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student,SubAdmin,ClassEntity,School])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
