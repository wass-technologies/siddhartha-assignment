import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Brackets, Repository } from 'typeorm';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { SchoolStatus } from 'src/enum';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository (Student) private readonly studentrepo : Repository<Student>,
    @InjectRepository(ClassEntity) private readonly classRepo: Repository<ClassEntity>,
    @InjectRepository(SchoolDetails) private readonly schoolRepo : Repository<SchoolDetails>,
  ){}

  async addStudent(schoolId:string,classId:string, dto:CreateStudentDto, subAdmin:string ) {
    const school = await this.schoolRepo.findOne({where:{id: schoolId},
    });
    if(!school){
      throw new NotFoundException('Sub School not found');
    }
    if(school.accountId!= subAdmin){
      throw new NotFoundException('You are not authorized to perform action to this School');

    }
    if (school.status === SchoolStatus.INACTIVE){
      throw new ForbiddenException('School is not Active');
    }
    const classEntity = await this.classRepo.findOne({where:{id: classId, school:{id:schoolId}},
    relations:['school']});

    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const newstudent = this.studentrepo.create(
      
      {
        ...dto,class:classEntity,
        studentName:dto.name
       
      }
    )

    return await this.studentrepo.save(newstudent);
  }






  //Get All Student

  async getAllStudents(dto: PaginationDto) {
    const keyword = dto.keyword || '';
  
    const [result, total] = await this.studentrepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.class', 'class')
      .leftJoinAndSelect('class.school', 'school')
  
      .select([
        'student.id',
        'student.studentName',
        'student.age',
        'student.address',
  
        'school.id',
        'school.schoolName',
  
        'class.id',
        'class.className',
      ])
      .where(
        new Brackets((qb) => {
          qb.where(
            'student.studentName LIKE :name OR school.schoolName LIKE :school OR class.className LIKE :class',
            {
              name: '%' + keyword + '%',
              school: '%' + keyword + '%',
              class: '%' + keyword + '%',
            },
          );
        }),
      )
      .orderBy({ 'school.schoolName': 'ASC', 'class.className': 'ASC' })
      .skip(dto.offset)
      .take(dto.limit)
      .getManyAndCount();
  
    return { result, total };
  }

  async getStudentById(studentId: string) {
    const student = await this.studentrepo
      .createQueryBuilder('student')
      .where('student.id = :studentId', { studentId })
      .getOne();
  
    if (!student) {
      throw new NotFoundException('Student not found');
    }
  
    return student;
  }
  



  async updateStudent(schoolName:string,classId:string, dto:UpdateStudentDto,id: string, subAdmin:string ) {
    const subSchool = await this.schoolRepo.findOne({where:{schoolName: schoolName},
    });
    if(!subSchool){
      throw new NotFoundException('Sub School not found');
    }
    if(subSchool.accountId!= subAdmin){
      throw new NotFoundException('You are not authorized');

    }
    if (subSchool.status=== SchoolStatus.INACTIVE){
      throw new ForbiddenException('School is not Active');
    }
    const classEntity = await this.classRepo.findOne({where:{id: classId, school:{schoolName:schoolName}},
    relations:['subSchool']});

    if(!classEntity){
      throw new NotFoundException('Class not found');
    }

    const student = await this.studentrepo.findOne({
      where: { id:id, class: { id: classId } },
      relations: ['class'],
    });
  
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    
  if (dto.age) student.age = dto.age;
  if (dto.gender) student.gender = dto.gender;
  if (dto.address) student.address = dto.address;
 


    

    return await this.studentrepo.save(student);
  }




  

  async deleteStudent(studentId: string) {
    await this.studentrepo.delete(studentId);
    return { message: 'Student deleted successfully' };
  }


  



  
 




  
}
