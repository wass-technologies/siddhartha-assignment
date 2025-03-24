import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { AssignSubAdminDto, PaginationDto, PaginationSDto, SchoolDto, StatusDto,} from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';
import { createSchoolTable } from 'src/utils/createSchoolTable.utils';
import { Response } from 'express';
import { ClassEntity } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { SchoolStatus, UserRole } from 'src/enum';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(SubAdmin) private subAdminRepo: Repository<SubAdmin>,
  ) {}
  private async getSubAdminIdByAccountId(accountId: string): Promise<string> {
    const subAdmin = await this.subAdminRepo.createQueryBuilder('subAdmin')
      .where('subAdmin.accountId = :accountId', { accountId })
      .getOne();
    if (!subAdmin) throw new NotFoundException('SubAdmin not found');
    return subAdmin.id;
  }

  private async verifySubAdminOwnership(accountId: string, schoolId: string) {
    const subAdminId = await this.getSubAdminIdByAccountId(accountId);
    const school = await this.schoolRepo.createQueryBuilder('school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .where('school.id = :id', { id: schoolId })
      .getOne();
    
    if (!school) throw new NotFoundException('School not found');
    if (school.subAdmin.id !== subAdminId) throw new ForbiddenException('Unauthorized access');
  }

  
  async assignSubAdmin(schoolId: string, subAdminId: string, replaceExisting: boolean) {
    const school = await this.schoolRepo.findOne({ 
        where: { id: schoolId }, 
        relations: ['subAdmin'] 
    });

    if (!school) {
        throw new NotFoundException('School not found');
    }

    if (school.subAdmin && !replaceExisting) {
        throw new ConflictException('School already has a SubAdmin. Set replaceExisting to true to replace.');
    }

    const subAdmin = await this.subAdminRepo.findOne({ where: { id: subAdminId } });

    if (!subAdmin) {
        throw new NotFoundException('SubAdmin not found');
    }

    // Assign the subAdmin to the school
    school.subAdmin = subAdmin;
    await this.schoolRepo.save(school);

    return { message: 'SubAdmin assigned successfully', school };
}



  async getAllSchools(paginationDto: PaginationDto) {
    const queryBuilder = this.schoolRepo.createQueryBuilder('school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .skip(paginationDto.offset)
      .take(paginationDto.limit);
    
    const [result, total] = await queryBuilder.getManyAndCount();
    return { result, total };
  }

  async getSchoolByAccountId(accountId: string) {
    const school = await this.schoolRepo.createQueryBuilder('school')
      .where('school.accountId = :accountId', { accountId })
      .getOne();
    
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async getSchoolsForSubAdmin(accountId: string, paginationDto: PaginationDto) {
    const subAdminId = await this.getSubAdminIdByAccountId(accountId);
    const queryBuilder = this.schoolRepo.createQueryBuilder('school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .where('subAdmin.id = :subAdminId', { subAdminId })
      .skip(paginationDto.offset)
      .take(paginationDto.limit);
    
    const [result, total] = await queryBuilder.getManyAndCount();
    return { result, total };
  }

  async getSchoolById(accountId: string, schoolId: string, role: UserRole) {
    const school = await this.schoolRepo.createQueryBuilder('school')
      .where('school.id = :id', { id: schoolId })
      .getOne();
    
    if (!school) throw new NotFoundException('School not found');
    if (role === UserRole.SUB_ADMIN) await this.verifySubAdminOwnership(accountId, schoolId);
    if (role === UserRole.SCHOOL && school.accountId !== accountId) throw new ForbiddenException('Unauthorized access');
    
    return school;
  }

  async updateSchool(accountId: string, schoolId: string, updateSchoolDto: SchoolDto, role: UserRole) {
    await this.getSchoolById(accountId, schoolId, role);
    await this.schoolRepo.createQueryBuilder()
      .update(School)
      .set(updateSchoolDto)
      .where('id = :id', { id: schoolId })
      .execute();
    return this.getSchoolById(accountId, schoolId, role);
  }

  async updateSchoolStatus(accountId: string, schoolId: string, newStatus: SchoolStatus, role: UserRole) {
    if (role === UserRole.SUB_ADMIN) await this.verifySubAdminOwnership(accountId, schoolId);
    await this.schoolRepo.createQueryBuilder()
      .update(School)
      .set({ status: newStatus })
      .where('id = :id', { id: schoolId })
      .execute();
    return this.getSchoolById(accountId, schoolId, role);
  }

  async updateSchoolByAccountId(accountId: string, updateSchoolDto: SchoolDto) {
    await this.getSchoolByAccountId(accountId);
    await this.schoolRepo.createQueryBuilder()
      .update(School)
      .set(updateSchoolDto)
      .where('accountId = :accountId', { accountId })
      .execute();
    return this.getSchoolByAccountId(accountId);
  }

  async deleteSchool(accountId: string, schoolId: string) {
    await this.getSchoolById(accountId, schoolId, UserRole.MAIN_ADMIN);
    await this.schoolRepo.createQueryBuilder()
      .delete()
      .from(School)
      .where('id = :id', { id: schoolId })
      .execute();
  }

  async generateSchoolListPdf(res: Response) {
    const schools = await this.schoolRepo.find();

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



  


