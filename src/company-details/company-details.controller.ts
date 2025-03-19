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
  PaginationSDto,
  SchoolDetailDto,
  StatusDto,
} from './dto/company-detail.dto';
import { Response } from 'express';

@Controller('school-details')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SchoolDetailsController {
  constructor(private readonly schoolService: SchoolDetailsService) {}


  //Create

  @Post('create')
  @Roles(UserRole.MAIN_ADMIN)
  async createSchool(@Body() dto: SchoolDetailDto) {
    return this.schoolService.createSchool(dto);
  }

  //Read 

  @Get('all-school')
  @Roles(UserRole.MAIN_ADMIN, UserRole.STAFF)
  async findList(@Body() dto: PaginationDto) {
    return this.schoolService.findList(dto);
  }

  @Get('by-status')
  @Roles(UserRole.STAFF)
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
  async update(@Param('id') id: string, @Body() dto: SchoolDetailDto) {
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
