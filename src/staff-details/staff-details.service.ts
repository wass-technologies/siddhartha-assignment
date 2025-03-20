import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDetailDto } from './dto/create-staff-detail.dto';
import { UpdateStaffDetailDto } from './dto/update-staff-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffDetail } from './entities/staff-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffDetailsService {
  constructor(
    @InjectRepository(StaffDetail)
    private staffRepository: Repository<StaffDetail>,
  ) {}




  async updateStaff(id: string, updateDto: UpdateStaffDetailDto): Promise<StaffDetail> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    Object.assign(staff, updateDto);
    return this.staffRepository.save(staff);
  }

  async deleteStaff(id: string): Promise<boolean> {
    const result = await this.staffRepository.delete(id);
    return result.affected > 0;
  }
}
