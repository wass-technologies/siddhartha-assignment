import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
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
  async addClass(@Param('subschoolId')subSchoolId:string, @Body()dto:CreateClassDto,
  @CurrentUser()user:Account){
    
    return await this.classService.addClass(subSchoolId,dto);

  }

  @Delete(':subschoolId/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async deleteClass(@Param('subschoolId') subSchoolId:string,@Param('classId') classId:string,@CurrentUser()user:Account){
    return this.classService.deleteClass(subSchoolId,classId);

  }
  @Get('all/:subSchoolId')
  @Roles(UserRole.SUB_ADMIN)
  async getAllClasses(@Param('subSchoolId') subSchoolId: string, @Query('page') page: number = 1, @Query('pageSize') pageSize: number= 10,@CurrentUser()user:Account){
    
    return this.classService.getAllClasses(subSchoolId,page,pageSize);

  }

  @Get('students/:classId')
  @Roles(UserRole.SUB_ADMIN)
  async getStudentsByClass(
    @Param('classId') classId: string,
    @CurrentUser() user: Account,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.classService.getStudentsByClass(classId, user,page, pageSize);
  }

  
}
