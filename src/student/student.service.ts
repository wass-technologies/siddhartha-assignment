import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto, PromoteStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Brackets, Repository } from 'typeorm';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SchoolStatus, UserRole } from 'src/enum';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { School } from 'src/user-details/entities/user-detail.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(ClassEntity) private classRepo: Repository<ClassEntity>,
    @InjectRepository(School) private schoolRepo: Repository<School>
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
  async addStudent(userId: string, userRole: UserRole, createStudentDto: CreateStudentDto) {
    await this.verifyUserAccess(userId, createStudentDto.schoolId, userRole);
    const student = this.studentRepo.create({ ...createStudentDto, class: { id: createStudentDto.classId } });
    return await this.studentRepo.save(student);
  }

  async getAllStudents(userId: string, schoolId: string, classId: string, userRole: UserRole, paginationDto: PaginationDto) {
    await this.verifyUserAccess(userId, schoolId, userRole);
    
    const { limit, offset } = paginationDto;
    
    const query = this.studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.class', 'class')
      .leftJoinAndSelect('class.school', 'school')
      .where('class.schoolId = :schoolId', { schoolId });

    if (classId) {
      query.andWhere('class.id = :classId', { classId });
    }

    if (paginationDto.keyword.trim()) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('LOWER(student.studentName) LIKE LOWER(:keyword)', { keyword: `%${paginationDto.keyword}%` });
        })
      );
    }

    query.orderBy({ 'class.className': 'ASC', 'student.studentName': 'ASC' });

    const [students, total] = await query.skip(offset).take(limit).getManyAndCount();
    return { total, students };
  }

  async updateStudent(userId: string, studentId: string, updateData: Partial<Student>, userRole: UserRole) {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.verifyUserAccess(userId, student.class.school.id, userRole);
    Object.assign(student, updateData);
    return await this.studentRepo.save(student);
  }

  async deleteStudent(userId: string, studentId: string, userRole: UserRole) {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.verifyUserAccess(userId, student.class.school.id, userRole);
    await this.studentRepo.delete({ id: studentId });
    return { message: 'Student deleted successfully' };
  }

  async promoteStudent(userId: string, studentId: string, promoteStudentDto: PromoteStudentDto, userRole: UserRole)
  {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.verifyUserAccess(userId, student.class.school.id, userRole);
    const newClass = await this.classRepo.findOne({ where: { id: promoteStudentDto.classId } });
    if (!newClass) {
      throw new NotFoundException('Target class not found');
    }
    student.class = newClass;
    return await this.studentRepo.save(student);
  }

  // async addStudent(schoolId:string,classId:string, dto:CreateStudentDto, subAdmin:string ) {
  //   const school = await this.schoolRepo.findOne({where:{id: schoolId},
  //   });
  //   if(!school){
  //     throw new NotFoundException('Sub School not found');
  //   }
  //   if(school.accountId!= subAdmin){
  //     throw new NotFoundException('You are not authorized to perform action to this School');

  //   }
  //   if (school.status === SchoolStatus.INACTIVE){
  //     throw new ForbiddenException('School is not Active');
  //   }
  //   const classEntity = await this.classRepo.findOne({where:{id: classId, school:{id:schoolId}},
  //   relations:['school']});

  //   if(!classEntity){
  //     throw new NotFoundException('Class not found');
  //   }

  //   const newstudent = this.studentrepo.create(
      
  //     {
  //       ...dto,class:classEntity,
  //       studentName:dto.name
       
  //     }
  //   )

  //   return await this.studentrepo.save(newstudent);
  // }






  // //Get All Student

  // async getAllStudents(dto: PaginationDto) {
  //   const keyword = dto.keyword || '';
  
  //   const [result, total] = await this.studentrepo
  //     .createQueryBuilder('student')
  //     .leftJoinAndSelect('student.class', 'class')
  //     .leftJoinAndSelect('class.school', 'school')
  
  //     .select([
  //       'student.id',
  //       'student.studentName',
  //       'student.age',
  //       'student.address',
  
  //       'school.id',
  //       'school.schoolName',
  
  //       'class.id',
  //       'class.className',
  //     ])
  //     .where(
  //       new Brackets((qb) => {
  //         qb.where(
  //           'student.studentName LIKE :name OR school.schoolName LIKE :school OR class.className LIKE :class',
  //           {
  //             name: '%' + keyword + '%',
  //             school: '%' + keyword + '%',
  //             class: '%' + keyword + '%',
  //           },
  //         );
  //       }),
  //     )
  //     .orderBy({ 'school.schoolName': 'ASC', 'class.className': 'ASC' })
  //     .skip(dto.offset)
  //     .take(dto.limit)
  //     .getManyAndCount();
  
  //   return { result, total };
  // }

  // async getStudentById(studentId: string) {
  //   const student = await this.studentrepo
  //     .createQueryBuilder('student')
  //     .where('student.id = :studentId', { studentId })
  //     .getOne();
  
  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }
  
  //   return student;
  // }
  



  // async updateStudent(schoolName:string,classId:string, dto:UpdateStudentDto,id: string, subAdmin:string ) {
  //   const subSchool = await this.schoolRepo.findOne({where:{name: schoolName},
  //   });
  //   if(!subSchool){
  //     throw new NotFoundException('Sub School not found');
  //   }
  //   if(subSchool.accountId!= subAdmin){
  //     throw new NotFoundException('You are not authorized');

  //   }
  //   if (subSchool.status=== SchoolStatus.INACTIVE){
  //     throw new ForbiddenException('School is not Active');
  //   }
  //   const classEntity = await this.classRepo.findOne({where:{id: classId, school:{name:schoolName}},
  //   relations:['subSchool']});

  //   if(!classEntity){
  //     throw new NotFoundException('Class not found');
  //   }

  //   const student = await this.studentrepo.findOne({
  //     where: { id:id, class: { id: classId } },
  //     relations: ['class'],
  //   });
  
  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }
    
  // if (dto.age) student.age = dto.age;
  // if (dto.gender) student.gender = dto.gender;
  // if (dto.address) student.address = dto.address;
 


    

  //   return await this.studentrepo.save(student);
  // }




  

  // async deleteStudent(studentId: string) {
  //   await this.studentrepo.delete(studentId);
  //   return { message: 'Student deleted successfully' };
  // }


  



  
 




  
}
