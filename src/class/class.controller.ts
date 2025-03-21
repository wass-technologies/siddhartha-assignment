import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/enum';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';

@Controller('class')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Post(':schoolId')
  @Roles(UserRole.SUB_ADMIN)
  async addClass(
    @CurrentUser() user:Account,
    @Param('schoolId') schoolId: string,
    @Body() dto: CreateClassDto,
  ) {
    return this.classService.addClass(user.id, schoolId, dto);
  }
  @Get(':schoolId')
  @Roles(UserRole.SUB_ADMIN)
  async getAllClasses(
    @CurrentUser()user:Account,
    @Param('schoolId') schoolId: string,
    @Body() dto: PaginationDto,
  ) {
    return this.classService.getAllClasses(user.id, schoolId, dto);
  }

  @Get('details/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async getClassById(
    @CurrentUser()user:Account,
    @Param('classId') classId: string,
  ) {
    return this.classService.getClassById(user.id, classId);
  }

  @Get('students/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async getStudents(
    @CurrentUser()user:Account,
    @Param('classId') classId: string,
    @Body() dto: PaginationDto,
  ) {
    return this.classService.getStudents(dto, classId, user);
  }

  @Delete(':schoolId/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async removeClass(
    @CurrentUser()user:Account,
    @Param('schoolId') schoolId: string,
    @Param('classId') classId: string,
  ) {
    return this.classService.remove(user, schoolId, classId);
  }


  
}
