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
  constructor(private readonly subAdminService: SubAdminDetailsService) {}


  @Get('school')
  @Roles(UserRole.SUB_ADMIN)
  async getSchoolDetails(@CurrentUser()user:Account) {
    return this.subAdminService.getSchoolDetails(user.id);
  }

  @Patch('school-details')
  @Roles(UserRole.SUB_ADMIN)
  async updateSchoolDetails(@CurrentUser()user:Account,@Body() dto: SchoolDetailDto) {
    return this.subAdminService.updateSchoolDetails(user.id, dto);
  }

  @Patch('school/status')
  @Roles(UserRole.SUB_ADMIN)
  async updateSchoolStatus(@CurrentUser()user:Account, @Body() dto: StatusDto) {
    return this.subAdminService.updateSchoolStatus(user.id, dto.status);
  }

}
