import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolStatus, UserRole } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { CreateAccountDto } from './dto/account.dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    
  ) {}


  async create(dto: CreateAccountDto, createdBy: string) {
    const user = await this.repo.findOne({
      where: { email: dto.email, role: UserRole.STAFF },
    });
    if (user) {
      throw new ConflictException('Login id already exists!');
    }

    const encryptedPassword = await bcrypt.hash(dto.password, 13);
    const obj = Object.assign({
      email: dto.email,
      password: encryptedPassword,
      createdBy,
      role: UserRole.STAFF,
    });
    const payload = await this.repo.save(obj);
    const object = Object.assign({
      name: dto.name,
      email: dto.email,
      dob: dto.dob,
      accountId: payload.id,
    });
    await this.staffRepo.save(object);
    return payload;
  }

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
  
}
