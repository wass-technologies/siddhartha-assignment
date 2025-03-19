import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolStatus } from 'src/enum';
import { Brackets, Repository } from 'typeorm';

import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    
  ) {}

  async findAllSubAdmins(dto: PaginationDto) {
    const keyword = dto.keyword || '';
  
    const [result, total] = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.schools', 'schools')
  
      .select([
        'account.id',
        'account.name',
        'account.email',
        'account.role',
        'account.status',
        'account.createdAt',
  
        'schools.id',
        
        'schools.schoolName',
        
      ])
      .where('account.role LIKE :role', { role: '%Sub_Admin%' }) 
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'account.email LIKE :email OR schools.schoolName LIKE :name',
            {
              email: '%' + keyword + '%',
              name: '%' + keyword + '%',
            },
          );
        }),
      )
      .orderBy({ 'schools.schoolName': 'ASC' })
      .skip(dto.offset)
      .take(dto.limit)
      .getManyAndCount();
  
    return { result, total };
  }



 

  async subAdminDetail(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.schools', 'schools')
      .where('account.id = :id', { id })
      .andWhere('account.roles LIKE :role', { role: '%Sub_Admin%' }) 
      .getOne();
  
    if (!result) {
      throw new NotFoundException('Sub Admin Profile Not Found!');
    }
  
    return result;
  }



  async staffDetail(id: string) {
    const result = await this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .where('account.id = :id', { id })
      .andWhere('account.roles LIKE :role', { role: '%Staff%' }) // Ensuring role is Staff
      .getOne();
  
    if (!result) {
      throw new NotFoundException('Staff Profile Not Found!');
    }
  
    return result;
  }
  


  
  

  // // async userProfile(id: string) {
  // //   const result = await this.repo
  // //     .createQueryBuilder('account')
  // //     .leftJoinAndSelect('account.userDetail', 'userDetail')
  // //     .select([
  // //       'account.id',
  // //       'account.phoneNumber',
  // //       'account.roles',
  // //       'account.status',
  // //       'account.createdAt',

  // //       'userDetail.id',
  // //       'userDetail.name',
  // //       'userDetail.email',
  // //       'userDetail.city',
  // //       'userDetail.interest',
  // //       'userDetail.wpNo',
  // //       'userDetail.profile',
  // //     ])
  // //     .where('account.id = :id', { id: id })
  // //     .getOne();
  // //   if (!result) {
  // //     throw new NotFoundException('Profile Not Found!');
  // //   }
  // //   return result;
  // // }
}
