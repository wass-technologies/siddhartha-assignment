import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  ClassEntity } from './entities/class.entity';
import { Brackets, Repository } from 'typeorm';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { Student } from 'src/student/entities/student.entity';
import { UserRole } from 'src/enum';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity) private readonly classRepo : Repository<ClassEntity>,
    @InjectRepository(SchoolDetails) private readonly schoolRepo : Repository<SchoolDetails>,
    @InjectRepository(Student) private readonly studentRepo : Repository<Student>,

  ){}

  async addClass(schoolId: string, dto: CreateClassDto) {
    const school = await this.schoolRepo.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException('School not found');
    }

    const existingClass = await this.classRepo.findOne({
      where: { className: dto.className, school: { id: schoolId } },
    });

    if (existingClass) {
      throw new ConflictException('Class already exists');
    }

    const newClass = this.classRepo.create({ ...dto, className: dto.className, school });
    return await this.classRepo.save(newClass);
  }

  async getAllClasses(dto: PaginationDto, schoolId: string) {
    const keyword = dto.keyword || '';
    const query = this.classRepo.createQueryBuilder('class')
      .leftJoinAndSelect('class.school', 'school')
      .select([
        'class.id',
        'class.className',
        'school.id',
        'school.schoolName',
      ])
      .where('class.schoolId = :schoolId', { schoolId });

    if (dto.keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('class.className LIKE :keyword', { keyword: `%${keyword}%` });
        }),
      );
    }

    const [result, total] = await query
      .skip(dto.offset)
      .take(dto.limit)
      .orderBy({ 'class.className': 'ASC' })
      .getManyAndCount();

    return { result, total };
  }

  async getClassById(classId: string) {
    const classEntity = await this.classRepo.findOne({
      where: { id: classId },
      relations: ['school'],
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return classEntity;
  }

  async getStudents(dto: PaginationDto, classId: string, user: Account) {
    const classEntity = await this.classRepo.createQueryBuilder('class')
      .leftJoinAndSelect('class.school', 'school')
      .where('class.id = :classId', { classId })
      .getOne();

    if (!classEntity) throw new NotFoundException('Class not found');
    if (classEntity.school.status !== 'ACTIVE') throw new ForbiddenException('School is inactive');
    if (user.role === UserRole.SUB_ADMIN && user.id !== classEntity.school.accountId) {
      throw new ForbiddenException('You do not have access to this class');
    }

    const [students, total] = await this.studentRepo.createQueryBuilder('student')
      .where('student.classId = :classId', { classId })
      .skip(dto.offset)
      .take(dto.limit)
      .getManyAndCount();

    return { result: students, total };
  }

  async update(classId: string, dto: UpdateClassDto) {
    const classEntity = await this.classRepo.findOne({ where: { id: classId } });
    if (!classEntity) throw new NotFoundException('Class not found');

    await this.classRepo.update(classId, {...dto});
    return { message: 'Class updated successfully' };
  }

  async remove(schoolId: string, classId: string) {
    const classToDelete = await this.classRepo.createQueryBuilder('class')
      .where('class.id = :classId', { classId })
      .andWhere('class.schoolId = :schoolId', { schoolId })
      .getOne();

    if (!classToDelete) throw new NotFoundException('Class Not Found');

    await this.classRepo.remove(classToDelete);
    return { message: 'Class deleted successfully' };
  }

 




}














