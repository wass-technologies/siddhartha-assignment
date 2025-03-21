import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { PaginationDto,} from './dto/company-detail.dto';
import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus, UserRole } from 'src/enum';
import { ClassEntity } from 'src/class/entities/class.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
import { Student } from 'src/student/entities/student.entity';
import { SchoolDto } from 'src/user-details/dto/update-user-details';
import { SubAdmin } from './entities/company-detail.entity';


@Injectable()
export class SubAdminDetailsService {
  constructor(
    @InjectRepository (ClassEntity) private readonly classRepo:Repository<ClassEntity>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(Student) private readonly studentRepo:Repository<Student>
  ) {} 

  async getSchools(userId: string, paginationDto: PaginationDto) {
    const { limit, offset, keyword } = paginationDto;

    const query = this.schoolRepo
        .createQueryBuilder('school')
        .leftJoinAndSelect('school.subAdmin', 'subAdmin')
        .where('subAdmin.accountId = :userId', { userId })
        .orderBy('school.createdAt', 'DESC')
        .skip(offset)
        .take(limit);

    if (keyword) {
        query.andWhere('LOWER(school.name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
    }

    const [schools, total] = await query.getManyAndCount();

    return { total, schools };
}

async findSchool(userId: string, schoolId: string) {
  const school = await this.schoolRepo.findOne({
    where: { id: schoolId },
    relations: ['subAdmin'],
  });

  if (!school || school.subAdmin?.accountId !== userId) {
    throw new ForbiddenException('You do not have permission to access this school.');
  }

  return school;
}

async updateSchoolDetails(userId: string, schoolId: string, dto: SchoolDto) {
  const school = await this.schoolRepo.findOne({
    where: { id: schoolId },
    relations: ['subAdmin'],
  });

  if (!school || school.subAdmin?.accountId !== userId) {
    throw new ForbiddenException('You do not have permission to update this school.');
  }

  Object.assign(school, dto);
  return this.schoolRepo.save(school);
}

async updateSchoolStatus(userId: string, schoolId: string, status: SchoolStatus) {
  const school = await this.schoolRepo.findOne({
    where: { id: schoolId },
    relations: ['subAdmin'],
  });

  if (!school || school.subAdmin?.accountId !== userId) {
    throw new ForbiddenException('You do not have permission to update this school status.');
  }

  school.status = status;
  return this.schoolRepo.save(school);
}

async deleteSchool(userId: string, schoolId: string) {
  const school = await this.schoolRepo.findOne({
    where: { id: schoolId },
    relations: ['subAdmin'],
  });

  if (!school || school.subAdmin?.accountId !== userId) {
    throw new ForbiddenException('You do not have permission to delete this school.');
  }

  await this.schoolRepo.remove(school);
  return { message: 'School deleted successfully' };
}


}
