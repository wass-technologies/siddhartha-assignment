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

  @Post('add/:subschoolId')
  @Roles(UserRole.SUB_ADMIN)
  async addClass(
    @Param('subSchoolId') subSchoolId: string,
    @Body() dto: CreateClassDto,
  ) {
    return this.classService.addClass(subSchoolId, dto);
  }


  @Get('all/:schoolId')
  @Roles(UserRole.SUB_ADMIN)
  async getAllClasses(@Query() dto: PaginationDto, @Param('schoolId') schoolId: string) {
    return this.classService.getAllClasses(dto, schoolId);
  }

  @Get(':classId')
  @Roles(UserRole.SUB_ADMIN)
  async getClassById(@Param('classId') classId: string) {
    return this.classService.getClassById(classId);
  }



  @Get(':classId/students')
  @Roles(UserRole.SUB_ADMIN, UserRole.STAFF)
  async getStudents(
    @Query() dto: PaginationDto,
    @Param('classId') classId: string,
    @CurrentUser() user: Account,
  ) {
    return this.classService.getStudents(dto, classId, user);
  }

  @Patch(':classId')
  @Roles(UserRole.SUB_ADMIN)
  async updateClass(
    @Param('classId') classId: string,
    @Body() dto: UpdateClassDto,
  ) {
    return this.classService.update(classId, dto);
  }

  @Delete(':schoolId/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async removeClass(
    @Param('schoolId') schoolId: string,
    @Param('classId') classId: string,
  ) {
    return this.classService.remove(schoolId, classId);
  }

  
}
