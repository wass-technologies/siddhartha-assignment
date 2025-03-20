import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Brackets, Repository } from 'typeorm';
import { PaginationDto, PaginationSDto, SchoolDto, StatusDto,} from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';
import { createSchoolTable } from 'src/utils/createSchoolTable.utils';
import { Response } from 'express';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private readonly repo: Repository<School>,
    @InjectRepository(Account)
    private readonly accountrepo: Repository<Account>,
  ) {}

  async createSchool(dto: SchoolDto) {
  
     const existingSchool = await this.repo.findOne({ where: { name: dto.name } });
   
     if (existingSchool) {
       throw new ConflictException(`School with name "${dto.name}" already exists!`);
     }
  
     const school = this.repo.create(dto);
     return this.repo.save(school);
   }
 
   async findList(dto: PaginationDto) {
     const keyword = dto.keyword || '';
     const query = this.repo
       .createQueryBuilder('school')
       .leftJoinAndSelect('school.subAdmin', 'subAdmin')
       .leftJoinAndSelect('school.companySchedule', 'companySchedule')
       .leftJoinAndSelect('school.classes', 'classes')
       .select([
         'school.id',
         'school.name',
         'school.address1',
         'school.address2',
         'school.state',
         'school.city',
         'school.area',
         'school.pincode',
         'school.status',
         'school.accountId',
         'school.createdAt',
         'school.updatedAt',
         'subAdmin.id',
         'subAdmin.name',
         'companySchedule.id',
         'classes.id',
         'classes.className'
       ]);
   
     query.andWhere(
       new Brackets((qb) => {
         qb.where('school.schoolName LIKE :schoolName', {
           schoolName: '%' + keyword + '%',
         });
       }),
     );
   
     const [result, total] = await query
       .skip(dto.offset)
       .take(dto.limit)
       .orderBy({ 'school.schoolName': 'ASC' })
       .getManyAndCount();
   
     return { result, total };
   }
 
 
 
 
   async findListByStatus(dto: PaginationSDto) {
     const keyword = dto.keyword || '';
     const query = this.repo
       .createQueryBuilder('school')
       .leftJoinAndSelect('school.subAdmin', 'subAdmin')
       .leftJoinAndSelect('school.classes', 'classes')
       .select([
         'school.id',
         'school.schoolName',
         'school.address1',
         'school.address2',
         'school.state',
         'school.city',
         'school.area',
         'school.pincode',
         'school.schoolDesc',
         'school.status',
         'school.accountId',
         'school.createdAt',
         'school.updatedAt',
         'subAdmin.id',
         'subAdmin.name',
         'classes.id',
         'classes.className',
       ])
       .where('school.status = :status', { status: dto.status });
       if(dto.keyword){
         query.andWhere(
           new Brackets((qb) => {
             qb.where('school.name LIKE :name', {
               name: '%' + keyword + '%',
             });
           }),
         );
 
   }
 
     const [result, total] = await query
       .skip(dto.offset)
       .take(dto.limit)
       .orderBy({ 'school.name': 'ASC' })
       .getManyAndCount();
 
     return { result, total };
   }
   
 
 
 
 
   async findSchool(id: string) {
     const result = await this.repo
       .createQueryBuilder('school')
       .where('school.accountId = :accountId', { accountId: id })
       .getOne();
     if (!result) {
       throw new NotFoundException('School not found!');
     }
     return result;
   }
 
   async update(id: string, dto: SchoolDto) {
     const result = await this.repo.findOne({ where: { accountId: id } });
     if (!result) {
       throw new NotFoundException('School not found!');
     }
     const obj = Object.assign(result, dto);
     return this.repo.save(obj);
   }
   
 
   async status(id: string, dto: StatusDto) {
     const result = await this.repo.findOne({ where: { accountId: id } });
     if (!result) {
       throw new NotFoundException('School detail not found!');
     }
     const obj = Object.assign(result, dto);
     return this.repo.save(obj);
   }
 
   async deleteSchool(id: string) {
     const result = await this.repo.findOne({ where: { accountId: id } });
     if (!result) {
       throw new NotFoundException('School not found!');
     }
     await this.repo.remove(result);
     return { message: 'School deleted successfully!' };
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
