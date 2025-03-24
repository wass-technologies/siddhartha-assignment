import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, SchoolStatus, UserRole } from 'src/enum';
import { AssignSubAdminDto, PaginationDto, SchoolDto,} from './dto/update-user-details';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { SchoolService } from './user-details.service';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { School } from './entities/user-detail.entity';


@Controller('school')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}


  @Post(':id/assign-subadmin')
  @Roles(UserRole.MAIN_ADMIN)
  async assignSubAdmin(
    @Param('id') schoolId: string,
    @Body('subAdminId') subAdminId: string,
    @Body('replaceExisting') replaceExisting: boolean
  ) {
    return this.schoolService.assignSubAdmin(schoolId, subAdminId, replaceExisting);
  }

  @Get('list')
  @Roles(UserRole.MAIN_ADMIN)
  async getAllSchools(@Body() paginationDto: PaginationDto) {
    return this.schoolService.getAllSchools(paginationDto);
  }

  @Get('subadmin/list')
  @Roles(UserRole.SUB_ADMIN)
  async getSchoolsForSubAdmin(
    @CurrentUser() user: Account,
    @Body() paginationDto: PaginationDto
  ) {
    return this.schoolService.getSchoolsForSubAdmin(user.id, paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.SUB_ADMIN, UserRole.MAIN_ADMIN, UserRole.SCHOOL)
  async getSchoolById(
    @CurrentUser() user: Account,
    @Param('id') schoolId: string
  ) {
    return this.schoolService.getSchoolById(user.id, schoolId, user.role);
  }

  @Patch(':id')
  @Roles(UserRole.SUB_ADMIN, UserRole.SCHOOL)
  async updateSchool(
    @CurrentUser() user: Account,
    @Param('id') schoolId: string,
    @Body() updateSchoolDto: SchoolDto
  ) {
    return this.schoolService.updateSchool(user.id, schoolId, updateSchoolDto, user.role);
  }

  @Patch(':id/status')
  @Roles(UserRole.SUB_ADMIN, UserRole.MAIN_ADMIN)
  async updateSchoolStatus(
    @CurrentUser() user: Account,
    @Param('id') schoolId: string,
    @Body('status') newStatus: SchoolStatus
  ) {
    return this.schoolService.updateSchoolStatus(user.id, schoolId, newStatus, user.role);
  }

  @Delete(':id')
  @Roles(UserRole.MAIN_ADMIN)
  async deleteSchool(@CurrentUser() user: Account, @Param('id') schoolId: string) {
    return this.schoolService.deleteSchool(user.id, schoolId);
  }

  @Get('account/me')
  @Roles(UserRole.SCHOOL)
  async getSchoolByAccount(@CurrentUser() user: Account) {
    return this.schoolService.getSchoolByAccountId(user.id);
  }

  @Patch('account/me')
  @Roles(UserRole.SCHOOL)
  async updateSchoolByAccount(@CurrentUser() user: Account, @Body() updateSchoolDto: SchoolDto) {
    return this.schoolService.updateSchoolByAccountId(user.id, updateSchoolDto);
  }

  @Get('generate/pdf')
  @Roles(UserRole.MAIN_ADMIN,UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'school_detail'])
  async generateSchoolListPdf(@Res() res: Response) {
    return this.schoolService.generateSchoolListPdf(res);
  }

  

 
}