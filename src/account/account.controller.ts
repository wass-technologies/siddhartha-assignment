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


@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
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
  @Roles(UserRole.MAIN_ADMIN,UserRole.STAFF)
  @CheckPermissions([PermissionAction.READ, 'account'])
  async getAllAccounts(@Body() dto: PaginationDto) {
    return this.accountService.findAllAccounts(dto);
  }

  @Get('sub-admin')
  @Roles(UserRole.SUB_ADMIN)
  async getSubAdminAccount(@CurrentUser()user:Account) {
    return this.accountService.getLoggedInSchoolDetails(user.id);
  }

  @Get('school')
  @Roles(UserRole.SCHOOL)
  async getAccount(@CurrentUser()user:Account) {
    return this.accountService.getLoggedInSchoolDetails(user.id);
  }

  @Get('staff-account')
  @Roles(UserRole.STAFF)
  async getStaffAccount(@CurrentUser()user:Account) {
    return this.accountService.getStaffDetails(user.id);
  }

  @Patch('update-status/:id')
  @Roles(UserRole.MAIN_ADMIN)
  @CheckPermissions([PermissionAction.UPDATE, 'account'])
  async updateAccountStatus(@Param('id') id: string, @Body('status') status: DefaultStatus) {
    return this.accountService.updateAccountStatus(id,status );
  }
}
