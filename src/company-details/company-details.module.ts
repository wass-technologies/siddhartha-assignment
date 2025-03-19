import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolDetailsController } from './company-details.controller';
import { SchoolDetailsService } from './company-details.service';
import { SchoolDetails } from './entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolDetails,Account]),
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
