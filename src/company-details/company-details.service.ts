import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import {

  PaginationDto,
 
  PaginationSDto,
 
  SchoolDetailDto,
  StatusDto,
} from './dto/company-detail.dto';

import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus, UserRole } from 'src/enum';
import { createSchoolTable } from 'src/utils/createSchoolTable.utils';
import { Response } from 'express';


@Injectable()
export class SchoolDetailsService {
  constructor(

    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  // async createSchool(dto: SchoolDetailDto) {
 
  //   const existingSchool = await this.repo.findOne({ where: { schoolName: dto.schoolName } });
  
  //   if (existingSchool) {
  //     throw new ConflictException(`School with name "${dto.schoolName}" already exists!`);
  //   }
 
  //   const school = this.repo.create(dto);
  //   return this.repo.save(school);
  // }

  // async findList(dto: PaginationDto) {
  //   const keyword = dto.keyword || '';
  //   const query = this.repo
  //     .createQueryBuilder('schoolDetails')
  //     .leftJoinAndSelect('schoolDetails.subAdmin', 'subAdmin')
  //     .leftJoinAndSelect('schoolDetails.companySchedule', 'companySchedule')
  //     .leftJoinAndSelect('schoolDetails.leed', 'leed')
  //     .leftJoinAndSelect('schoolDetails.classes', 'classes')
  //     .select([
  //       'schoolDetails.id',
  //       'schoolDetails.schoolName',
  //       'schoolDetails.address1',
  //       'schoolDetails.address2',
  //       'schoolDetails.state',
  //       'schoolDetails.city',
  //       'schoolDetails.area',
  //       'schoolDetails.pincode',
  //       'schoolDetails.schoolDesc',
  //       'schoolDetails.status',
  //       'schoolDetails.accountId',
  //       'schoolDetails.createdAt',
  //       'schoolDetails.updatedAt',
  //       'subAdmin.id',
  //       'subAdmin.name',
  //       'companySchedule.id',
  //       'leed.id',
  //       'classes.id',
  //     ]);
  
  //   query.andWhere(
  //     new Brackets((qb) => {
  //       qb.where('schoolDetails.schoolName LIKE :schoolName', {
  //         schoolName: '%' + keyword + '%',
  //       });
  //     }),
  //   );
  
  //   const [result, total] = await query
  //     .skip(dto.offset)
  //     .take(dto.limit)
  //     .orderBy({ 'schoolDetails.schoolName': 'ASC' })
  //     .getManyAndCount();
  
  //   return { result, total };
  // }




  // async findListByStatus(dto: PaginationSDto) {
  //   const keyword = dto.keyword || '';
  //   const query = this.repo
  //     .createQueryBuilder('schoolDetails')
  //     .leftJoinAndSelect('schoolDetails.subAdmin', 'subAdmin')
  //     .leftJoinAndSelect('schoolDetails.classes', 'classes')
  //     .select([
  //       'schoolDetails.id',
  //       'schoolDetails.schoolName',
  //       'schoolDetails.address1',
  //       'schoolDetails.address2',
  //       'schoolDetails.state',
  //       'schoolDetails.city',
  //       'schoolDetails.area',
  //       'schoolDetails.pincode',
  //       'schoolDetails.schoolDesc',
  //       'schoolDetails.status',
  //       'schoolDetails.accountId',
  //       'schoolDetails.createdAt',
  //       'schoolDetails.updatedAt',
  //       'subAdmin.id',
  //       'subAdmin.name',
  //       'classes.id',
  //     ])
  //     .where('schoolDetails.status = :status', { status: dto.status });
  //     if(dto.keyword){
  //       query.andWhere(
  //         new Brackets((qb) => {
  //           qb.where('schoolDetails.schoolName LIKE :schoolName', {
  //             schoolName: '%' + keyword + '%',
  //           });
  //         }),
  //       );

  // }

  //   const [result, total] = await query
  //     .skip(dto.offset)
  //     .take(dto.limit)
  //     .orderBy({ 'schoolDetails.schoolName': 'ASC' })
  //     .getManyAndCount();

  //   return { result, total };
  // }
  




  // async findSchool(id: string) {
  //   const result = await this.repo
  //     .createQueryBuilder('schoolDetails')
  //     .where('schoolDetails.accountId = :accountId', { accountId: id })
  //     .getOne();
  //   if (!result) {
  //     throw new NotFoundException('School not found!');
  //   }
  //   return result;
  // }

  // async update(id: string, dto: SchoolDetailDto) {
  //   const result = await this.repo.findOne({ where: { accountId: id } });
  //   if (!result) {
  //     throw new NotFoundException('School not found!');
  //   }
  //   const obj = Object.assign(result, dto);
  //   return this.repo.save(obj);
  // }
  

  // async status(id: string, dto: StatusDto) {
  //   const result = await this.repo.findOne({ where: { accountId: id } });
  //   if (!result) {
  //     throw new NotFoundException('School detail not found!');
  //   }
  //   const obj = Object.assign(result, dto);
  //   return this.repo.save(obj);
  // }

  // async deleteSchool(id: string) {
  //   const result = await this.repo.findOne({ where: { accountId: id } });
  //   if (!result) {
  //     throw new NotFoundException('School not found!');
  //   }
  //   await this.repo.remove(result);
  //   return { message: 'School deleted successfully!' };
  // }

  // async generateSchoolListPdf(res: Response) {
  //   const schools = await this.repo.find();

  //   if (schools.length === 0) {
  //     throw new NotFoundException('No schools found');
  //   }

  //   const doc = await createSchoolTable(schools);

  //   res.setHeader('Content-Disposition', 'attachment; filename="schools_list.pdf"');
  //   res.setHeader('Content-Type', 'application/pdf');

  //   doc.pipe(res);
  //   doc.end();
  // }





  













}
