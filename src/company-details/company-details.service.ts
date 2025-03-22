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

  private async getSubAdminSchool(accountId: string) {
    const subAdmin = await this.subAdminRepo
      .createQueryBuilder('subAdmin') 
      .leftJoinAndSelect('subAdmin.school', 'school')
      .where('subAdmin.accountId = :accountId', { accountId })
      .getOne();
  
    if (!subAdmin || !subAdmin.school) {
      throw new ForbiddenException('SubAdmin is not linked to any school or unauthorized.');
    }
  
    return subAdmin.school;
  }
  
  
  async getSchoolDetails(accountId: string) {
    return this.getSubAdminSchool(accountId);
  }
  
  async updateSchoolDetails(accountId: string, dto: SchoolDetailDto) {
    const school = await this.getSubAdminSchool(accountId);

    await this.schoolRepo
      .createQueryBuilder()
      .update(School)
      .set(dto)
      .where('id = :schoolId', { schoolId: school.id })
      .execute();
  
    return { message: 'School details updated successfully',school };
  }
  
  async updateSchoolStatus(accountId: string, status: SchoolStatus) {
    const school = await this.getSubAdminSchool(accountId);

    await this.schoolRepo
      .createQueryBuilder()
      .update(School)
      .set({ status })
      .where('id = :schoolId', { schoolId: school.id })
      .execute();
    const result={id:school.id, name: school.name, status:school.status };
  
    return { message: `School status updated to ${status}`,result };
  }
}
