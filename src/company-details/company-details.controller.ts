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
import { SubAdminDetailsService } from './company-details.service';
import {
  PaginationDto,
  PaginationSDto,
  SchoolDetailDto,
  StatusDto,
} from './dto/company-detail.dto';
import { Response } from 'express';
import { SchoolDto } from 'src/user-details/dto/update-user-details';

@Controller('sub-admin')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
export class SubAdminDetailsController {
  constructor(private readonly schoolService: SubAdminDetailsService) {}

  @Get('schools')
  @Roles(UserRole.SUB_ADMIN)
  getSubAdminSchools(@Body() paginationDto: PaginationDto, @CurrentUser() user: Account) {
    return this.schoolService.getSchools(user.id, paginationDto);
  }

  @Get(':schoolId')
  @Roles(UserRole.SUB_ADMIN)
  findSchool(@Param('schoolId') schoolId: string, @CurrentUser() user: Account) {
    return this.schoolService.findSchool(user.id, schoolId);
  }

  @Put('update/:schoolId')
  @Roles(UserRole.SUB_ADMIN)
  updateSchoolDetails(@Param('schoolId') schoolId: string, @Body() dto: SchoolDto, @CurrentUser() user: Account) {
    return this.schoolService.updateSchoolDetails(user.id, schoolId, dto);
  }

  @Put('status/:schoolId')
  @Roles(UserRole.SUB_ADMIN)
  updateSchoolStatus(@Param('schoolId') schoolId: string, @Body('status') status: SchoolStatus, @CurrentUser() user: Account) {
    return this.schoolService.updateSchoolStatus(user.id, schoolId, status);
  }

  @Delete('delete/:schoolId')
  @Roles(UserRole.SUB_ADMIN)
  deleteSchool(@Param('schoolId') schoolId: string, @CurrentUser() user: Account) {
    return this.schoolService.deleteSchool(user.id, schoolId);
  }


}
