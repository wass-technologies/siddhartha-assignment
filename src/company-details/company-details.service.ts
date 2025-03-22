import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { PaginationDto, SchoolDetailDto,} from './dto/company-detail.dto';
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


  private async getSubAdminSchools(accountId: string) {
    const subAdmin = await this.subAdminRepo
      .createQueryBuilder('subAdmin')
      .leftJoinAndSelect('subAdmin.schools', 'school') // Change 'school' to 'schools'
      .where('subAdmin.accountId = :accountId', { accountId })
      .getOne();
    
    if (!subAdmin || !subAdmin.schools.length) {
      throw new ForbiddenException('SubAdmin is not linked to any schools or unauthorized.');
    }

    return subAdmin.schools;
  }

  async getSchoolDetails(accountId: string, paginationDto: PaginationDto) {
    const { limit, offset, keyword } = paginationDto;
  
    const query = this.schoolRepo
      .createQueryBuilder('school')
      .innerJoin('school.subAdmin', 'subAdmin')
      .where('subAdmin.accountId = :accountId', { accountId })
      .take(limit)
      .skip(offset);
  
    if (keyword) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('school.name LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('school.email LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('school.city LIKE :keyword', { keyword: `%${keyword}%` });
        })
      );
    }
  
    const [schools, total] = await query.getManyAndCount();
  
    return {
      total,
      limit,
      offset,
      data: schools,
    };
  }
  

  async updateSchoolDetails(accountId: string, schoolId: string, dto: SchoolDetailDto) {
    const schools = await this.getSubAdminSchools(accountId);
    
    const school = schools.find(s => s.id === schoolId);
    if (!school) throw new NotFoundException('School not found or unauthorized');

    await this.schoolRepo.update(schoolId, dto);
    
    return { message: 'School details updated successfully', school };
  }

  async updateSchoolStatus(accountId: string, schoolId: string, status: SchoolStatus) {
    const schools = await this.getSubAdminSchools(accountId);
    
    const school = schools.find(s => s.id === schoolId);
    if (!school) throw new NotFoundException('School not found or unauthorized');

    await this.schoolRepo.update(schoolId, { status });

    return { message: `School status updated to ${status}`, result: { id: school.id, name: school.name, status } };
  }
}
