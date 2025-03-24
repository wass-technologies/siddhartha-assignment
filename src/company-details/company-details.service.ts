import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto, SchoolDetailDto, UpdateSubAdminDto,} from './dto/company-detail.dto';
import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus, UserRole } from 'src/enum';
import { ClassEntity } from 'src/class/entities/class.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
import { Student } from 'src/student/entities/student.entity';
import { SchoolDto } from 'src/user-details/dto/update-user-details';
import { SubAdmin } from './entities/company-detail.entity';


@Injectable()
export class SubAdminDetailsService {
  constructor(
    @InjectRepository (SubAdmin) private readonly subAdminRepo: Repository<SubAdmin>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
  ) {} 
  async getAllSubAdmins(paginationDto: PaginationDto): Promise<SubAdmin[]> {
    const { offset, limit, keyword } = paginationDto;
    const queryBuilder: SelectQueryBuilder<SubAdmin> = this.subAdminRepo.createQueryBuilder('subAdmin')
      .leftJoinAndSelect('subAdmin.schools', 'school')
      .where(
        new Brackets((qb) => {
          if (keyword) {
            qb.where('subAdmin.name LIKE :keyword', { keyword: `%${keyword}%` })
              .orWhere('subAdmin.email LIKE :keyword', { keyword: `%${keyword}%` });
          }
        }),
      )
      .skip(offset)
      .take(limit);

    return await queryBuilder.getMany();
  }

  async getSubAdminById(id: string): Promise<SubAdmin> {
    const subAdmin = await this.subAdminRepo.createQueryBuilder('subAdmin')
      .leftJoinAndSelect('subAdmin.schools', 'school')
      .where('subAdmin.id = :id', { id })
      .getOne();
    
    if (!subAdmin) {
      throw new NotFoundException('SubAdmin not found');
    }
    return subAdmin;
  }

  async updateSubAdmin(id: string, updateSubAdminDto: UpdateSubAdminDto): Promise<SubAdmin> {
    await this.subAdminRepo.update(id, updateSubAdminDto);
    return this.getSubAdminById(id);
  }

  async deleteSubAdmin(id: string): Promise<void> {
    const result = await this.subAdminRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('SubAdmin not found');
    }
  }

  async verifySubAdminAssociation(subAdminId: string, schoolId: string): Promise<boolean> {
    const school = await this.schoolRepo.createQueryBuilder('school')
      .leftJoinAndSelect('school.subAdmin', 'subAdmin')
      .where('school.id = :schoolId', { schoolId })
      .getOne();
    
    if (!school) {
      throw new NotFoundException('School not found');
    }
    if (school.subAdmin.id !== subAdminId) {
      throw new ForbiddenException('SubAdmin is not associated with this school');
    }
    return true;
  }


  // private async getSubAdminSchools(accountId: string) {
  //   const subAdmin = await this.subAdminRepo
  //     .createQueryBuilder('subAdmin')
  //     .leftJoinAndSelect('subAdmin.schools', 'school') // Change 'school' to 'schools'
  //     .where('subAdmin.accountId = :accountId', { accountId })
  //     .getOne();
    
  //   if (!subAdmin || !subAdmin.schools.length) {
  //     throw new ForbiddenException('SubAdmin is not linked to any schools or unauthorized.');
  //   }

  //   return subAdmin.schools;
  // }

  // async getSchoolDetails(accountId: string, paginationDto: PaginationDto) {
  //   const { limit, offset, keyword } = paginationDto;
  
  //   const query = this.schoolRepo
  //     .createQueryBuilder('school')
  //     .innerJoin('school.subAdmin', 'subAdmin')
  //     .where('subAdmin.accountId = :accountId', { accountId })
  //     .take(limit)
  //     .skip(offset);
  
  //   if (keyword) {
  //     query.andWhere(
  //       new Brackets(qb => {
  //         qb.where('school.name LIKE :keyword', { keyword: `%${keyword}%` })
  //           .orWhere('school.email LIKE :keyword', { keyword: `%${keyword}%` })
  //           .orWhere('school.city LIKE :keyword', { keyword: `%${keyword}%` });
  //       })
  //     );
  //   }
  
  //   const [schools, total] = await query.getManyAndCount();
  
  //   return {
  //     total,
  //     limit,
  //     offset,
  //     data: schools,
  //   };
  // }
  

  // async updateSchoolDetails(accountId: string, schoolId: string, dto: SchoolDetailDto) {
  //   const schools = await this.getSubAdminSchools(accountId);
    
  //   const school = schools.find(s => s.id === schoolId);
  //   if (!school) throw new NotFoundException('School not found or unauthorized');

  //   await this.schoolRepo.update(schoolId, dto);
    
  //   return { message: 'School details updated successfully', school };
  // }

  // async updateSchoolStatus(accountId: string, schoolId: string, status: SchoolStatus) {
  //   const schools = await this.getSubAdminSchools(accountId);
    
  //   const school = schools.find(s => s.id === schoolId);
  //   if (!school) throw new NotFoundException('School not found or unauthorized');

  //   await this.schoolRepo.update(schoolId, { status });

  //   return { message: `School status updated to ${status}`, result: { id: school.id, name: school.name, status } };
  // }
}
