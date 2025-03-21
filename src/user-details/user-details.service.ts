import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Brackets, Repository } from 'typeorm';
import { PaginationDto, PaginationSDto, SchoolDto, StatusDto,} from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';
import { createSchoolTable } from 'src/utils/createSchoolTable.utils';
import { Response } from 'express';
import { ClassEntity } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private readonly repo: Repository<School>,
    @InjectRepository(Account)
    private readonly accountrepo: Repository<Account>,
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,
    @InjectRepository (Student) private readonly studentRepo: Repository<Student>,
   @InjectRepository(SubAdmin) private subAdminRepository: Repository<SubAdmin>,
  ) {}


  async getSchoolDetails(userId: string) {
    const school = await this.repo.findOne({
      where: { accountId: userId }, 
    });
  
    if (!school) {
      throw new ForbiddenException('No associated school found.');
    }
  
    return this.repo.createQueryBuilder('school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .select([
        'school.id',
        'school.name',
        'school.email',
        'school.address1',
        'school.address2',
        'school.state',
        'school.city',
        'school.area',
        'school.pincode',
        'school.status',
        'school.createdAt',
        'school.updatedAt',
        'subAdmin.id',
        'subAdmin.name'
      ])
      .where('school.id = :schoolId', { schoolId: school.id })
      .getOne();
  }
  
  async getTotalClasses(userId: string, paginationDto: PaginationDto) {
    const school = await this.repo.findOne({ where: { accountId: userId } });
    if (!school) {
      throw new ForbiddenException('No associated school found.');
    }

    const { limit, offset, keyword } = paginationDto;
    
    const query = this.classRepo.createQueryBuilder('class')
      .where('class.schoolId = :schoolId', { schoolId: school.id })
      .select(['class.id', 'class.className'])
      .skip(offset)
      .take(limit);

    if (keyword) {
      query.andWhere(new Brackets(qb => {
        qb.where('class.className LIKE :keyword', { keyword: `%${keyword}%` });
      }));
    }

    const [result, total] = await query.getManyAndCount();
    return { result, total };
  }

  async getClassWiseStudentList(userId: string, classId: string, paginationDto: PaginationDto) {
    const school = await this.repo.findOne({ where: { accountId: userId } });
    if (!school) {
      throw new ForbiddenException('No associated school found.');
    }

    const { limit, offset } = paginationDto;

    const query = this.classRepo.createQueryBuilder('class')
      .leftJoinAndSelect('class.students', 'students')
      .where('class.id = :classId', { classId })
      .andWhere('class.schoolId = :schoolId', { schoolId: school.id })
      .select([
        'class.id',
        'class.className',
        'students.id',
        'students.studentName',
        'students.age'
      ])
      .orderBy('students.studentName', 'ASC')
      .skip(offset)
      .take(limit);

    const [classData, total] = await query.getManyAndCount();

    if (!classData.length) {
      throw new ForbiddenException('You do not have access to this class.');
    }

    return {
      totalStudents: total,
      students: classData,
    };
}



  async getStudentById(userId: string, studentId: string) {
    const school = await this.repo.findOne({ where: { accountId: userId } });
    if (!school) {
      throw new ForbiddenException('No associated school found.');
    }

    const query = this.studentRepo.createQueryBuilder('student')
      .leftJoinAndSelect('student.class', 'class')
      .where('student.id = :studentId', { studentId })
      .andWhere('class.schoolId = :schoolId', { schoolId: school.id })
      .select([
        'student.id',
        'student.name',
        'student.email',
        'class.id',
        'class.name'
      ]);
    
    const studentData = await query.getOne();
    if (!studentData) {
      throw new ForbiddenException('You do not have access to this student.');
    }
    return studentData;
  }

  async assignSubAdmin(schoolId: string, subAdminId: string): Promise<School> {
    const school = await this.repo.findOne({
      where: { id: schoolId },
      relations: ['subAdmin'],
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    const subAdmin = await this.subAdminRepository.findOne({
      where: { id: subAdminId },
    });

    if (!subAdmin) {
      throw new NotFoundException('SubAdmin not found');
    }

    // Assign the subAdmin
    school.subAdmin = subAdmin;

    // Save the updated school entity
    return await this.repo.save(school);
  }


  
  async generateSchoolListPdf(res: Response) {
    const schools = await this.repo.find();

    if (schools.length === 0) {
      throw new NotFoundException('No schools found');
    }

    const doc = await createSchoolTable(schools);

    res.setHeader('Content-Disposition', 'attachment; filename="schools_list.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);
    doc.end();
  }


}



  


