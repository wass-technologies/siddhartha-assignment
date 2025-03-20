import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';

import { Student } from 'src/student/entities/student.entity';
import { School } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClassEntity, School, Student])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
