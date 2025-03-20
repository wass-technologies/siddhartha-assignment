import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserRole } from 'src/enum';
import { signIn, UpdateUserStatusDto} from './dto/login.dto';

import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 
  @Post('mainadmin/login')
  async mainAdminLogin(@Body() dto: signIn) {
    return this.authService.mainAdmindminsignIn(dto);
  }

  @Post('subAdmin/login')
  async subAdminLogin(@Body() dto: signIn) {
    return this.authService.subAdminsignIn(dto);
  }

  @Post('staff/login')
  async staffLogin(@Body() dto: signIn) {
    return this.authService.staffSignIn(dto);
  }





}
