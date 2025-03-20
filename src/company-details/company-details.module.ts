import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolDetailsController } from './company-details.controller';
import { SchoolDetailsService } from './company-details.service';

import { Account } from 'src/account/entities/account.entity';
import { SubAdmin } from './entities/company-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubAdmin,Account]),
    AuthModule,
    MulterModule.register({ dest: './uploads/companyDetail' }),
    // CompanySubCategoryModule,
    // CompanyCategoryModule,
  ],
  controllers: [SchoolDetailsController],
  providers: [SchoolDetailsService],
  exports: [SchoolDetailsService],
})
export class CompanyDetailsModule {}
