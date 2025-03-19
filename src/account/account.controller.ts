import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, UserRole } from 'src/enum';
import { MenusService } from 'src/menus/menus.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { AccountService } from './account.service';

import { Account } from './entities/account.entity';
import { SearchHistoryService } from 'src/search-history/search-history.service';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly searchHistoryService: SearchHistoryService,
    private readonly menuService: MenusService,
    private readonly permissionService: PermissionsService,
    private readonly userPermService: UserPermissionsService,
  ) { }



  @Get('sub-admins')
  async getAllSubAdmins(@Body() paginationDto: PaginationDto) {
    return this.accountService.findAllSubAdmins(paginationDto);
  }

  @Get('sub-admins/:id')
  async getSubAdminById(@Param('id') id: string) {
    return this.accountService.subAdminDetail(id);
  }

  @Get('staff/:id')
  async getStaffById(@Param('id') id: string) {
    return this.accountService.staffDetail(id);
  }


}
