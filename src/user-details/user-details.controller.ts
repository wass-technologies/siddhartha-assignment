import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, UserRole } from 'src/enum';
import { PaginationDto, PaginationSDto, SchoolDto, StatusDto,  } from './dto/update-user-details';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { School } from './entities/user-detail.entity';
import { SchoolService } from './user-details.service';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Response } from 'express';


@Controller('school')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}


  //Create

  @Post('create')
  @Roles(UserRole.MAIN_ADMIN)
  async createSchool(@Body() dto: SchoolDto) {
    return this.schoolService.createSchool(dto);
  }

  //Read 

  @Get('all-school')
  @Roles(UserRole.MAIN_ADMIN, UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'school_detail'])
  async findList(@Body() dto: PaginationDto) {
    return this.schoolService.findList(dto);
  }

  @Get('by-status')
  @Roles(UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'school_detail'])
  async getSchoolsByStatus(@Body() paginationDto: PaginationSDto) {
    return this.schoolService.findListByStatus(paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.SUB_ADMIN, UserRole.STAFF)
  async findSchool(@Param('id') id: string) {
    return this.schoolService.findSchool(id);
  }

  // Update 
  @Put(':id')
  @Roles(UserRole.MAIN_ADMIN)
  async update(@Param('id') id: string, @Body() dto: SchoolDto) {
    return this.schoolService.update(id, dto);
  }

  @Put(':id/status')
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.UPDATE, 'school_detail'])
  async status(@Param('id') id: string, @Body() dto: StatusDto) {
    return this.schoolService.status(id, dto);
  }

  // Delete

  @Delete(':id')
  @Roles(UserRole.MAIN_ADMIN)
  async deleteSchool(@Param('id') id: string) {
    return this.schoolService.deleteSchool(id);
  }

  // Export
  @Get('export/pdf')
  @Roles(UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'school_detail'])
  async generateSchoolListPdf(@Res() res: Response) {
    return this.schoolService.generateSchoolListPdf(res);
  }
}