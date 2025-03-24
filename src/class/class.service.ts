import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  ClassEntity } from './entities/class.entity';
import { Brackets, Repository } from 'typeorm';

import { Account } from 'src/account/entities/account.entity';
import { Student } from 'src/student/entities/student.entity';
import { UserRole } from 'src/enum';
import { School } from 'src/user-details/entities/user-detail.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity) private readonly classRepo : Repository<ClassEntity>,
    @InjectRepository(School) private readonly schoolRepo : Repository<School>,
    @InjectRepository(Student) private readonly studentRepo : Repository<Student>,

  ){}

  async verifyUserAccess(userId: string, schoolId: string, userRole: UserRole) {
    if (userRole === UserRole.SCHOOL) {
      const school = await this.schoolRepo.findOne({ where: { id: schoolId, accountId: userId } });
      if (!school) {
        throw new ForbiddenException('You do not have permission to manage this school');
      }
    } else if (userRole === UserRole.SUB_ADMIN) {
      const isAuthorized = await this.schoolRepo
        .createQueryBuilder('school')
        .leftJoin('school.subAdmin', 'subAdmin')
        .where('school.id = :schoolId', { schoolId })
        .andWhere('subAdmin.accountId = :userId', { userId })
        .getExists();
      if (!isAuthorized) {
        throw new ForbiddenException('You do not have permission to manage this school');
      }
    } else {
      throw new ForbiddenException('Invalid role');
    }
  }

  async addClassToSchool(userId: string, schoolId: string, className: string, userRole: UserRole) {
    await this.verifyUserAccess(userId, schoolId, userRole);
    
    const classExists = await this.classRepo
      .createQueryBuilder('class')
      .where('LOWER(class.className) = LOWER(:className)', { className })
      .andWhere('class.schoolId = :schoolId', { schoolId })
      .getExists();
  
    if (classExists) {
      throw new ConflictException('Class already exists');
    }
  
    const newClass = this.classRepo.create({ className, school: { id: schoolId } });
    return await this.classRepo.save(newClass);
  }

  async getAllClassesForSchool(userId: string, schoolId: string, userRole: UserRole, paginationDto: PaginationDto) {
    await this.verifyUserAccess(userId, schoolId, userRole);
    const { limit, offset, keyword = '' } = paginationDto;
    const query = this.classRepo
      .createQueryBuilder('class')
      .where('class.schoolId = :schoolId', { schoolId });

    if (keyword.trim()) {
      query.andWhere('LOWER(class.className) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
    }

    const [classes, total] = await query.skip(offset).take(limit).getManyAndCount();
    return { total, classes };
  }

  async getClassById(userId: string, classId: string, userRole: UserRole) {
    const classEntity = await this.classRepo
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.school', 'school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .where('class.id = :classId', { classId })
      .getOne();
  
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
  
    await this.verifyUserAccess(userId, classEntity.school.id, userRole);
  
    return classEntity;
  }

  async updateClass(userId: string, classId: string, className: string, userRole: UserRole) {
    const classEntity = await this.classRepo.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.verifyUserAccess(userId, classEntity.school.id, userRole);
    classEntity.className = className;
    return await this.classRepo.save(classEntity);
  }
  async deleteClass(userId: string, classId: string, userRole: UserRole) {
    const classEntity = await this.classRepo.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.verifyUserAccess(userId, classEntity.school.id, userRole);
    await this.classRepo.delete({ id: classId });
    return { message: 'Class deleted successfully' };
  }
  async getStudentsInClass(userId: string, classId: string, userRole: UserRole, paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const classEntity = await this.classRepo
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.school', 'school')
      .where('class.id = :classId', { classId })
      .getOne();

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.verifyUserAccess(userId, classEntity.school.id, userRole);
    
    const [students, total] = await this.studentRepo
      .createQueryBuilder('student')
      .where('student.classId = :classId', { classId })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return { total, students };
  }



  // async addClass(userId: string, schoolId: string, dto: CreateClassDto) {
  //   const isAuthorized = await this.schoolRepo
  //     .createQueryBuilder('school')
  //     .leftJoin('school.subAdmin', 'subAdmin')
  //     .where('school.id = :schoolId', { schoolId })
  //     .andWhere('subAdmin.accountId = :userId', { userId })
  //     .getExists();
  //   if (!isAuthorized) {
  //     throw new ForbiddenException('Access denied.');
  //   }
  //   const classExists = await this.classRepo
  //     .createQueryBuilder('class')
  //     .where('LOWER(class.className) = LOWER(:className)', { className: dto.className })
  //     .andWhere('class.schoolId = :schoolId', { schoolId })
  //     .getExists();
  
  //   if (classExists) {
  //     throw new ConflictException('Class already exists.');
  //   }
  //   const newClass = this.classRepo.create({ ...dto, school: { id: schoolId } });
  //   return await this.classRepo.save(newClass);
  // }
  
  

  // async getAllClasses(userId: string, schoolId: string, dto: PaginationDto) {
  //   const { limit, offset, keyword = '' } = dto;
  //   const isAuthorized = await this.schoolRepo
  //     .createQueryBuilder('school')
  //     .leftJoin('school.subAdmin', 'subAdmin')
  //     .where('school.id = :schoolId', { schoolId })
  //     .andWhere('subAdmin.accountId = :userId', { userId })
  //     .getExists();
  
  //   if (!isAuthorized) {
  //     throw new ForbiddenException('Access denied to this school.');
  //   }
  //   const query = this.classRepo
  //     .createQueryBuilder('class')
  //     .leftJoinAndSelect('class.school', 'school')
  //     .select([
  //       'class.id',
  //       'class.className',
  //       'school.id',
  //       'school.name',
  //     ])
  //     .where('class.schoolId = :schoolId', { schoolId });

  //   if (keyword.trim()) {
  //     query.andWhere('LOWER(class.className) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
  //   }
  
  //   const [classes, total] = await query
  //     .skip(offset)
  //     .take(limit)
  //     .orderBy('class.className', 'ASC')
  //     .getManyAndCount();
  
  //   return { total, classes };
  // }
  
  // async getClassById(userId: string, classId: string) {
  //   const classEntity = await this.classRepo
  //     .createQueryBuilder('class')
  //     .leftJoinAndSelect('class.school', 'school')
  //     .leftJoinAndSelect('school.subAdmin', 'subAdmin')
  //     .where('class.id = :classId', { classId })
  //     .getOne();
  
  //   if (!classEntity) {
  //     throw new NotFoundException('Class not found');
  //   }
  
  //   if (classEntity.school.subAdmin?.accountId !== userId) {
  //     throw new ForbiddenException('Access denied to this school.');
  //   }
  
  //   return classEntity;
  // }
  // async getStudents(dto: PaginationDto, classId: string, user: Account) {
  //   const classEntity = await this.classRepo
  //     .createQueryBuilder('class')
  //     .leftJoinAndSelect('class.school', 'school')
  //     .leftJoinAndSelect('school.subAdmin', 'subAdmin')
  //     .where('class.id = :classId', { classId })
  //     .getOne();
  
  //   if (!classEntity) throw new NotFoundException('Class not found');
  //   if (classEntity.school.status !== 'ACTIVE') throw new ForbiddenException('School is inactive');

  //   if (classEntity.school.subAdmin?.accountId !== user.id ) 
  //     {
  //     throw new ForbiddenException('You do not have access to this class');
  //   }
 
  //   const [students, total] = await this.studentRepo
  //     .createQueryBuilder('student')
  //     .where('student.classId = :classId', { classId })
  //     .orderBy('student.name', 'ASC') // Sorting by name for better organization
  //     .skip(dto.offset)
  //     .take(dto.limit)
  //     .getManyAndCount();
  
  //   return { result: students, total };
  // }
  
  // async remove(user: Account, schoolId: string, classId: string) {
  //   const isAuthorized = await this.schoolRepo
  //     .createQueryBuilder('school')
  //     .leftJoin('school.subAdmin', 'subAdmin')
  //     .where('school.id = :schoolId', { schoolId })
  //     .andWhere('subAdmin.accountId = :userId', { userId: user.id })
  //     .getExists();
  
  //   if (!isAuthorized) {
  //     throw new ForbiddenException('You do not have permission to delete this class');
  //   }
  //   const classExists = await this.classRepo
  //     .createQueryBuilder('class')
  //     .where('class.id = :classId', { classId })
  //     .andWhere('class.schoolId = :schoolId', { schoolId })
  //     .getExists();
  //   if (!classExists) {
  //     throw new NotFoundException('Class not found');
  //   }
  //   await this.classRepo.delete({ id: classId });
  
  //   return { message: 'Class deleted successfully' };
  // }
  
  
  
  }















