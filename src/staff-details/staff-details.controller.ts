import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { StaffDetailsService } from './staff-details.service';
import { CreateStaffDetailDto } from './dto/create-staff-detail.dto';
import { UpdateStaffDetailDto } from './dto/update-staff-detail.dto';

@Controller('staff-details')
export class StaffDetailsController {
  constructor(private readonly staffDetailsService: StaffDetailsService) {}





  @Delete(':id')
  async deleteStaff(@Param() id: string) {
    const deleted = await this.staffDetailsService.deleteStaff(id);
    if (!deleted) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return { message: 'Staff deleted successfully' };
  }
}
