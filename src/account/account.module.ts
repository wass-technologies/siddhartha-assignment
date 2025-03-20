import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MenusModule } from 'src/menus/menus.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserPermissionsModule } from 'src/user-permissions/user-permissions.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';

import { SearchHistoryModule } from 'src/search-history/search-history.module';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Account,School,SubAdmin,StaffDetail]),
    AuthModule,
    MenusModule,
    PermissionsModule,
    UserPermissionsModule,
    SearchHistoryModule,
    
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
