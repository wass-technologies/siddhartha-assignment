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
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account,SchoolDetails]),
    AuthModule,
    MenusModule,
    PermissionsModule,
    UserPermissionsModule,
    
    SearchHistoryModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
