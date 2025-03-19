import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import {

  PaginationDto,
 
  SchoolDetailDto,
  StatusDto,
} from './dto/company-detail.dto';
import { SchoolDetails } from './entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus, UserRole } from 'src/enum';
import { createSchoolTable } from 'src/utils/createSchoolTable.utils';
import { Response } from 'express';


@Injectable()
export class SchoolDetailsService {
  constructor(
    @InjectRepository(SchoolDetails)
    private readonly repo: Repository<SchoolDetails>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async createSchool(dto: SchoolDetailDto) {
 
    const existingSchool = await this.repo.findOne({ where: { schoolName: dto.schoolName } });
  
    if (existingSchool) {
      throw new ConflictException(`School with name "${dto.schoolName}" already exists!`);
    }
 
    const school = this.repo.create(dto);
    return this.repo.save(school);
  }
  

  //Update Details

  async updateSchool(schoolId: string, dto: SchoolDetailDto) {
    const school = await this.repo.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException('School not found!');
    }

    Object.assign(school, dto);
    return this.repo.save(school);
  }

  //Assign SubAdmin
  async assignSubAdmin(schoolId: string, subAdminId: string) {
    const school = await this.repo.findOne({ where: { id: schoolId }, relations: ['subAdmin'] });
    if (!school) {
      throw new NotFoundException('School not found!');
    }

    const subAdmin = await this.accountRepo.findOne({ where: { id: subAdminId, role: UserRole.SUB_ADMIN } });
    if (!subAdmin) {
      throw new NotFoundException('Sub Admin not found!');
    }

    // Remove previous Sub Admin if exists
    if (school.subAdmin) {
      school.subAdmin = null;
      await this.repo.save(school);
    }

    // Assign new Sub Admin
    school.subAdmin = subAdmin;
    return this.repo.save(school);
  }

  

  //Remove
  async removeSubAdmin(schoolId: string) {
    const school = await this.repo.findOne({ where: { id: schoolId }, relations: ['subAdmin'] });
    if (!school) {
      throw new NotFoundException('School not found!');
    }

    school.subAdmin = null;
    return this.repo.save(school);
  }




   //Get Schools List
   async findSchools(dto: PaginationDto) {
    const keyword = dto.keyword || '';
    const query = this.repo
      .createQueryBuilder('school')
      .where('school.schoolName LIKE :schoolName', { schoolName: `%${keyword}%` });

    const [result, total] = await query.skip(dto.offset).take(dto.limit).orderBy({ 'school.schoolName': 'ASC' }).getManyAndCount();
    return { result, total };
  }

    // Fetch active or deactivated school
    async getSchoolsByStatus(status: SchoolStatus, paginationDto: PaginationDto) {
      const { limit, offset, keyword } = paginationDto;
  
      const whereCondition = keyword
        ? { status, schoolName: Like(`%${keyword}%`) }
        : { status };
  
      const [schools, total] = await this.repo.findAndCount({
        where: whereCondition,
        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' },
      });
  
      return {
        data: schools,
        totalSchools: total,
        limit,
        offset,
      };
    }


  async findSchool(id: string) {
    const result = await this.repo
      .createQueryBuilder('schoolDetail')
      .where('schoolDetail.id = :Id', { Id: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('School not found!');
    }
    return result;
  }

//Upadate Status
  async updateStatus(schoolId: string, dto: StatusDto) {
    const school = await this.repo.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException('School not found!');
    }

   const obj =  Object.assign(school, dto);
    return this.repo.save(obj);
  }

  //Pdf 

  async generateSchoolListPdf(res: Response) {
    const schools = await this.repo.find(); 

    if (schools.length === 0) {
      throw new NotFoundException('No schools found');
    }

    const doc = await createSchoolTable(schools); // Use the createTable function

    // Set response headers for PDF download
    res.setHeader('Content-Disposition', 'attachment; filename="schools_list.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res); // Pipe PDF directly to response
    doc.end(); // Finalize PDF
  }


}
