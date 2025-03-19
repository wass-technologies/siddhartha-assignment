import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, SchoolStatus, UserRole } from 'src/enum';
import { SchoolDetailsService } from './company-details.service';
import {
  PaginationDto,
  SchoolDetailDto,
  StatusDto,
} from './dto/company-detail.dto';
import { Response } from 'express';

@Controller('school-details')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SchoolDetailsController {
  constructor(private readonly schoolDetailsService: SchoolDetailsService) {}
//Update School
  @Patch('update')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.STAFF)
  update(@CurrentUser() user: Account, @Body() dto: SchoolDetailDto) {
    return this.schoolDetailsService.updateSchool(user.id, dto);
  }

  // @Put('profile')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.STAFF)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads/companyDetail/profile',
  //       filename: (req, file, callback) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         return callback(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async profileImage(
  //   @CurrentUser() user: Account,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   const fileData = await this.companyDetailsService.findCompany(user.id);
  //   return this.companyDetailsService.profileImage(file.path, fileData);
  // }

// delete SubAdmin
  @Delete(':schoolId/remove-sub-admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.UPDATE, 'school_detail'])
  removeSubAdmin(@Param('schoolId') schoolId: string) {
    return this.schoolDetailsService.removeSubAdmin(schoolId);
  }


  //Create School

  @Post('create')
  @Roles(UserRole.MAIN_ADMIN)
  createSchool(@CurrentUser() user: Account,@Body() dto: SchoolDetailDto) {
    return this.schoolDetailsService.createSchool(dto);
  }


  //Assign Admin

  @Post(':schoolId/assign-sub-admin/:subAdminId')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.UPDATE, 'school_detail'])
  assignSubAdmin(@Param('schoolId') schoolId: string, @Param('subAdminId') subAdminId: string) {
    return this.schoolDetailsService.assignSubAdmin(schoolId, subAdminId);
 }




//Get Schools

@Get('all-school')
@Roles(UserRole.MAIN_ADMIN)
async getAllSchools(@Body() dto: PaginationDto)
{
  return this.schoolDetailsService.findSchools(dto);
}




 // Status
 @Put(':id/status')
//  @ApiOperation({ summary: 'For Admin' })
 @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
 @Roles(UserRole.MAIN_ADMIN)
@CheckPermissions([PermissionAction.UPDATE, 'school_detail'])
 status(@Param('id') id: string, @Body() dto: StatusDto) {
   return this.schoolDetailsService.updateStatus(id, dto);
 }


@Get('pdf')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
@Roles(UserRole.STAFF)
@CheckPermissions([PermissionAction.READ, 'school_detail'])
async generateSchoolListPdf(@Res() res: Response, @CurrentUser() user: Account) {
  
  return this.schoolDetailsService.generateSchoolListPdf(res);
}

// Get All Active Schools
@Get('active')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
@Roles(UserRole.STAFF)
@CheckPermissions([PermissionAction.READ, 'school_detail'])
async getAllActiveSchools(@Query() paginationDto: PaginationDto) {
  return this.schoolDetailsService.getSchoolsByStatus(SchoolStatus.ACTIVE, paginationDto);
  }
 // Get All Deactivated Schools
@Get('pending')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
@Roles(UserRole.STAFF)
@CheckPermissions([PermissionAction.READ, 'school_detail'])
async getAllPendingSchools(@Query() paginationDto: PaginationDto) {
  return this.schoolDetailsService.getSchoolsByStatus(SchoolStatus.PENDING, paginationDto);
  }

 // Get All Deactivated Schools
 @Get('inactive')
 @UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
 @Roles(UserRole.STAFF)
 @CheckPermissions([PermissionAction.READ, 'school_detail'])
 async getAllInactiveSchools(@Query() paginationDto: PaginationDto) {
   return this.schoolDetailsService.getSchoolsByStatus(SchoolStatus.INACTIVE, paginationDto);
   }






 @Get(':id')
@Roles(UserRole.SUB_ADMIN)
async findSchool(@Param('id') id: string) {
  return await this.schoolDetailsService.findSchool(id);
}










}
