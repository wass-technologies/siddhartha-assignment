import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
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

  async addClass(subSchoolId:string,dto:CreateClassDto, ){
  
  
    const subSchool = await this.schoolRepo.findOne({where:{id:subSchoolId}});
    if(!subSchool){
        throw new NotFoundException('School not found');
    }
  
    const existingClass = await this.classRepo.findOne({where:{className:dto.name,school:subSchool}})
    if(existingClass){
        throw new ConflictException('Class already exists');
    }

    
    
    const newClass = this.classRepo.create({...dto,className:dto.name,school:subSchool})
    return await this.classRepo.save(newClass)
  
  }
  //delete class
async deleteClass(subSchoolId:string, classId:string){
 
  const classDelete = await this.classRepo.findOne({where:{id:classId, school:{id:subSchoolId}}});
  
  if(!classDelete){
    throw new NotFoundException('Class Not Found');
  }
  const subSchool = await this.schoolRepo.findOne({ where: { id: subSchoolId } });

}

 
//Get All Classes
async getAllClasses(schoolId: string, page: number = 1, pageSize: number = 10) {


  // Check if the subSchool exists
  const school = await this.schoolRepo.findOne({ where: { id: schoolId } });
  if (!school) {
    throw new NotFoundException('School not found');
  }
  
  // Get the classes for the specific SubSchool with pagination and relations
  const [classes, total] = await this.classRepo.findAndCount({
    where: { school: { id: schoolId } },
    skip: (page - 1) * pageSize,  
    take: pageSize,               
    relations: ['school'],     
  });

  // Map the classes to the desired output
  const formattedClass = classes.map((classEntity) => ({
    classId: classEntity.id,
    className: classEntity.className,
    schoolId: classEntity.school.id,
    schoolName: classEntity.school.schoolName,
  }));

  const hasNextPage = classes.length ==pageSize

  // Return the paginated response
  return {
    classes: formattedClass,
    totalClass: total,
    totalPage: Math.ceil(total / pageSize),
    currentPage: page,
    hasNextPage: hasNextPage,
  };
}




async getStudentsByClass(
  classId: string,
  user: Account,
  page: number = 1,
  pageSize: number = 10
) {
 
  const classEntity = await this.classRepo.findOne({
    where: { id: classId },
    relations: ['school'],
  });

  if (!classEntity) {
    throw new NotFoundException('Class not found');
  }

  if (classEntity.school.status !== 'ACTIVE') {
    throw new ForbiddenException('School is inactive');
  }


  if (user.role === UserRole.SUB_ADMIN && user.id !== classEntity.school.accountId) {
    throw new ForbiddenException('You do not have access to this class');
  }

  const [students, total] = await this.studentRepo.findAndCount({
    where: { class: { id: classId } },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    classId: classEntity.id,
    className: classEntity.className,
    schoolId: classEntity.school.id,
    schoolName: classEntity.school.schoolName,
    students,
    totalStudents: total,
    totalPage: Math.ceil(total / pageSize),
    currentPage: page,
    hasNextPage: students.length === pageSize,
  };
}





}
