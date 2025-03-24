import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DefaultStatus, PermissionAction, UserRole } from 'src/enum';
import { MenusService } from 'src/menus/menus.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { AccountService } from './account.service';

import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { CreateAccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly menuService: MenusService,
    private readonly permissionService: PermissionsService,
    private readonly userPermService: UserPermissionsService
    
  ) { }
  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.CREATE, 'account'])
  async create(@Body() dto: CreateAccountDto, @CurrentUser() user: Account) {
    const account = await this.accountService.create(dto, user.id);

    if (dto.role === UserRole.STAFF) {
      const menus = await this.menuService.findAll();
      const perms = await this.permissionService.findAll();
      const obj = [];
      menus.forEach((menu) => {
        perms.forEach((perm) => {
          obj.push({
            accountId: account.id,
            menuId: menu.id,
            permissionId: perm.id,
          });
        });
      });
      await this.userPermService.create(obj);
  
    }
    return account;
  }

  @Get('all')
  async getAllAccounts(@Query() dto: PaginationDto) {
    return this.accountService.findAllAccounts(dto);
  }

  @Get('logged-in/sub-admin/:id')
  async getLoggedInSubAdmin(@Param('id') id: string) {
    return this.accountService.getLoggedInSubAdminDetails(id);
  }

  @Get('logged-in/school/:id')
  async getLoggedInSchool(@Param('id') id: string) {
    return this.accountService.getLoggedInSchoolDetails(id);
  }

  @Get('staff-account/:id')
  async getStaffAccount(@Param('id') id: string) {
    return this.accountService.getStaffDetails(id);
  }

  @Patch('update-status/:id')
  async updateAccountStatus(@Param('id') id: string, @Body('status') status: DefaultStatus) {
    return this.accountService.updateAccountStatus(id,status );
  }
}
