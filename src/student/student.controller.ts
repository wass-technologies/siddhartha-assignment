import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, PromoteStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { PaginationSDto } from 'src/user-details/dto/update-user-details';

@Controller('student')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Post()
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async addStudent(@CurrentUser() user: Account, @Body() createStudentDto: CreateStudentDto) {
    return this.studentService.addStudent(user.id, user.role, createStudentDto);
  }

  @Get('all-student')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async getAllStudents(
    @CurrentUser() user: Account,
    @Body('schoolId') schoolId: string,
    @Body('classId') classId: string,
    @Body() paginationDto: PaginationDto
  ) {
    return this.studentService.getAllStudents(user.id, schoolId, classId, user.role, paginationDto);
  }

  @Patch(':id')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async updateStudent(@CurrentUser() user: Account, @Param('id') studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(user.id, studentId, updateStudentDto, user.role);
  }

  @Delete(':id')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async deleteStudent(@CurrentUser() user: Account, @Param('id') studentId: string) {
    return this.studentService.deleteStudent(user.id, studentId, user.role);
  }

  @Patch(':id/promote')
  @Roles(UserRole.SCHOOL, UserRole.SUB_ADMIN)
  async promoteStudent(@CurrentUser() user: Account, @Param('id') studentId: string, @Body() promoteStudentDto: PromoteStudentDto) {
    return this.studentService.promoteStudent(user.id, studentId, promoteStudentDto, user.role);
  }



  // @Post(':subSchoolId/:classId')
  //  @Roles(UserRole.SUB_ADMIN)
  // async addStudent(
  //   @Param('subSchoolId') subSchoolId: string,
  //   @Param('classId') classId: string,
  //   @Body() dto: CreateStudentDto,
  //   @CurrentUser()user:Account,
    
  // ) {
  //   const subAdmin = user.id;  
  //   return this.studentService.addStudent(subSchoolId, classId, dto, subAdmin);
  // }

  // @Get('all-student')
  // @Roles(UserRole.SUB_ADMIN)
  // async getAllStudent(@Body()dto:PaginationDto){
  //   return this.studentService.getAllStudents(dto);

  // }

  //   // Delete Student
  //   @Delete(':studentId')
  //   @Roles(UserRole.SUB_ADMIN)
  //   async deleteStudent(@Param('studentId') studentId: string) {
  //     return this.studentService.deleteStudent(studentId);
  //   }
  
  //   // Get Student by ID
  //   @Get(':studentId')
  //   @Roles(UserRole.MAIN_ADMIN)
  //   async getStudentById(@Param('studentId') studentId: string) {
  //     return this.studentService.getStudentById(studentId);
  //   }
  




}
