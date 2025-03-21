import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, UserRole } from 'src/enum';
import { PaginationDto,} from './dto/update-user-details';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { SchoolService } from './user-details.service';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';


@Controller('school')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}



  @Get('details')
  @Roles(UserRole.SCHOOL)
  getSchoolDetails(@CurrentUser()user:Account) {
    return this.schoolService.getSchoolDetails(user.id);
  }

  @Get('classes')
  @Roles(UserRole.SCHOOL)
  getTotalClasses(@Body() paginationDto: PaginationDto, @CurrentUser()user:Account) {
    return this.schoolService.getTotalClasses(user.id, paginationDto);
  }

  @Get('class/students')
  @Roles(UserRole.SCHOOL)
  getClassWiseStudentList(@Body() body: { classId: string, paginationDto: PaginationDto }, @CurrentUser()user:Account) {
      return this.schoolService.getClassWiseStudentList(user.id, body.classId, body.paginationDto);
  }
  

  @Get('student/:id')
  @Roles(UserRole.SCHOOL)
  getStudentById(@Param('id') studentId: string,@CurrentUser()user:Account) {
    return this.schoolService.getStudentById(user.id, studentId);
  }
  

  @Get('generate/pdf')
  @Roles(UserRole.MAIN_ADMIN,UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'school_detail'])
  async generateSchoolListPdf(@Res() res: Response) {
    return this.schoolService.generateSchoolListPdf(res);
  }

  @Patch(':schoolId/assign-subadmin/:subAdminId')
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.UPDATE, 'school_detail'])
  async assignSubAdmin(
    @Param('schoolId') schoolId: string,
    @Param('subAdminId') subAdminId: string,
  ) {
    return this.schoolService.assignSubAdmin(schoolId, subAdminId);
  }
  

 
}