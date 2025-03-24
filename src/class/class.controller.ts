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
 
  @Post()
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async addClass(@CurrentUser() user:Account, @Body() createClassDto: CreateClassDto) {
    const { schoolId, className } = createClassDto;
    return this.classService.addClassToSchool(user.id, schoolId, className, user.role);
  }
  @Get()
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async getAllClasses(@CurrentUser() user:Account, @Body() paginationDto: PaginationDto, @Query('schoolId') schoolId: string) {
    return this.classService.getAllClassesForSchool(user.id, schoolId, user.role, paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async getClassById(@CurrentUser() user:Account, @Param('id') classId: string) {
    return this.classService.getClassById(user.id, classId, user.role);
  }

  @Patch(':id')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async updateClass(@CurrentUser() user:Account, @Param('id') classId: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.updateClass(user.id, classId, updateClassDto.className, user.role);
  }

  @Delete(':id')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async deleteClass(@CurrentUser() user:Account, @Param('id') classId: string) {
    return this.classService.deleteClass(user.id, classId, user.role);
  }

  @Get(':id/students')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async getStudentsInClass(@CurrentUser()user:Account, @Param('id') classId: string, @Body() paginationDto: PaginationDto) {
    return this.classService.getStudentsInClass(user.id, classId, user.role, paginationDto);
  }

}
