import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultStatus, SchoolStatus, UserRole } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { ChangePasswordDto, CreateAccountDto } from './dto/account.dto';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(School) private readonly schoolRepo :Repository<School>,
    @InjectRepository(SubAdmin) private readonly subAdminRepo:Repository<SubAdmin>,
    @InjectRepository(StaffDetail) private readonly staffRepo: Repository<StaffDetail>,

    
  ) {}


  async create(dto: CreateAccountDto, createdBy: string) {
    
    const user = await this.repo.findOne({
      where: { email: dto.email, role: dto.role},
    });
    if (user) {
      throw new ConflictException('email id already exists!');
    }
    if (![UserRole.SUB_ADMIN, UserRole.STAFF, UserRole.SCHOOL].includes(dto.role)) {
      throw new BadRequestException('Invalid role selection.');
    }

    const encryptedPassword = await bcrypt.hash(dto.password, 13);
    const obj = Object.assign({
      email: dto.email,
      name:dto.name,
      password: encryptedPassword,
      createdBy,
      role: dto.role,
    });
    const payload = await this.repo.save(obj);

    let entityObject = {};

    if (dto.role === UserRole.SCHOOL) {
      entityObject = Object.assign({
        name: dto.name,
        email: dto.email,
        status: SchoolStatus.PENDING,
        accountId: payload.id, 
      });

      await this.schoolRepo.save(entityObject);
    } 
    else if (dto.role === UserRole.STAFF) {
      entityObject = Object.assign({
        name: dto.name,
        email: dto.email,
        accountId: payload.id,
      });

      await this.staffRepo.save(entityObject);
    } 
    else if (dto.role === UserRole.SUB_ADMIN) {
      entityObject = Object.assign({
        name: dto.name,
        email: dto.email,
        accountId: payload.id,
      });

      await this.subAdminRepo.save(entityObject);
    }

    return payload;
}

async findAllAccounts(dto: PaginationDto) {
  const keyword = dto.keyword || '';

  const queryBuilder = this.repo.createQueryBuilder('account')
      .leftJoinAndSelect('account.subAdmins', 'subAdmins')
      .leftJoinAndSelect('account.schools', 'schools')
      .leftJoinAndSelect('account.staffDetails', 'staffDetails')
      .select([
          'account.id',
          'account.name',
          'account.email',
          'account.role',
          'account.status',
          'account.createdAt',
          'subAdmins.id',
          'subAdmins.name',
          'schools.id',
          'schools.name',
          'staffDetails.id',
          'staffDetails.name'
      ])
      .where(
          new Brackets(qb => {
              qb.where('account.email LIKE :keyword', { keyword: `%${keyword}%` })
                  .orWhere('subAdmins.name LIKE :keyword', { keyword: `%${keyword}%` })
                  .orWhere('schools.name LIKE :keyword', { keyword: `%${keyword}%` })
                  .orWhere('staffDetails.name LIKE :keyword', { keyword: `%${keyword}%` });
          })
      )
      .orderBy('account.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

  const [result, total] = await queryBuilder.getManyAndCount();
  return { result, total };
}

async getSubAdminDetails(accountId: string) {
  const result = await this.repo.createQueryBuilder('account')
      .leftJoinAndSelect('account.subAdmins', 'subAdmins')
      .select([
          'account.id',
          'account.email',
          'account.role',
          'account.status',
          'account.createdAt',
          'subAdmins.id',
          'subAdmins.name',
      ])
      .where('account.id = :accountId', { accountId })
      .getOne();

  if (!result) throw new NotFoundException('Sub Admin Profile Not Found!');
  return result;
}

async getSchoolDetails(accountId: string) {
  const result = await this.repo.createQueryBuilder('account')
    .leftJoinAndSelect('account.schools', 'schools')
    .select([
      'account.id',
      'account.email',
      'account.role',
      'account.status',
      'account.createdAt',
      'schools.id',
      'schools.name',
    ])
    .where('account.id = :accountId', { accountId })
    .getOne();

  if (!result) throw new NotFoundException('School Profile Not Found!');
  return result;
}

async getStaffDetails(accountId: string) {
  const result = await this.repo.createQueryBuilder('account')
    .leftJoinAndSelect('account.staffDetails', 'staffDetails')
    .select([
      'account.id',
      'account.email',
      'account.role',
      'account.status',
      'account.createdAt',
      'staffDetails.id',
      'staffDetails.name',
    ])
    .where('account.id = :accountId', { accountId })
    .getOne();

  if (!result) throw new NotFoundException('Staff Profile Not Found!');
  return result;
}
async checkUserStatus(accountId: string) {
  const account = await this.repo.findOne({
    where: { id: accountId },
    select: ['id', 'email', 'name', 'status'],
  });

  if (!account) {
    throw new NotFoundException('User not found');
  }

  return {account};
}

async updateAccountStatus(accountId: string, status: DefaultStatus) {
  const updateResult = await this.repo.createQueryBuilder()
      .update(Account)
      .set({ status })
      .where('id = :accountId', { accountId })
      .execute();

  if (!updateResult) {
      throw new NotFoundException('Account not found');
  }
  return { message: 'Account status updated successfully' };
}

async changePassword(accountId: string, dto: ChangePasswordDto) {
  const user = await this.repo.findOne({
    where: { id: accountId },
    select: ['id', 'password'],
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Old password is incorrect');
  }

  if (dto.newPassword !== dto.confirmPassword) {
    throw new BadRequestException('New password and confirm password do not match');
  }

  const hashedPassword = await bcrypt.hash(dto.newPassword, 13);
  await this.repo.update(accountId, { password: hashedPassword });

  return { message: 'Password updated successfully' };
}

  
}
