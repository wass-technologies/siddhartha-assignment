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
  UpdateSubAdminDto,
} from './dto/company-detail.dto';
import { Response } from 'express';
import { SchoolDto } from 'src/user-details/dto/update-user-details';
import { SubAdmin } from './entities/company-detail.entity';

@Controller('sub-admin')
@UseGuards(AuthGuard('jwt'), RolesGuard,PermissionsGuard)
export class SubAdminDetailsController {
  constructor(private readonly subAdminService: SubAdminDetailsService) {}


  @Get()
  @Roles(UserRole.MAIN_ADMIN)
  async getAllSubAdmins(@Body() paginationDto: PaginationDto): Promise<SubAdmin[]> {
    return this.subAdminService.getAllSubAdmins(paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.MAIN_ADMIN, UserRole.SUB_ADMIN)
  async getSubAdminById(@Param('id') id: string): Promise<SubAdmin> {
    return this.subAdminService.getSubAdminById(id);
  }

  @Put(':id')
  @Roles(UserRole.MAIN_ADMIN)
  async updateSubAdmin(
    @Param('id') id: string,
    @Body() updateSubAdminDto: UpdateSubAdminDto,
  ): Promise<SubAdmin> {
    return this.subAdminService.updateSubAdmin(id, updateSubAdminDto);
  }

  @Delete(':id')
  @Roles(UserRole.MAIN_ADMIN)
  async deleteSubAdmin(@Param('id') id: string): Promise<void> {
    return this.subAdminService.deleteSubAdmin(id);
  }

  @Get(':subAdminId/verify/:schoolId')
  @Roles(UserRole.MAIN_ADMIN, UserRole.SUB_ADMIN)
  async verifySubAdminAssociation(
    @Param('subAdminId') subAdminId: string,
    @Param('schoolId') schoolId: string,
  ): Promise<boolean> {
    return this.subAdminService.verifySubAdminAssociation(subAdminId, schoolId);
  }
}

