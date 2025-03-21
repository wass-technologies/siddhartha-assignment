import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SubAdminDetailsController } from './company-details.controller';
import { SubAdminDetailsService } from './company-details.service';

import { Account } from 'src/account/entities/account.entity';
import { SubAdmin } from './entities/company-detail.entity';
import { Student } from 'src/student/entities/student.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { School } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubAdmin,Student,ClassEntity,School]),
    AuthModule,
    MulterModule.register({ dest: './uploads/companyDetail' }),
    // CompanySubCategoryModule,
    // CompanyCategoryModule,
  ],
  controllers: [SubAdminDetailsController],
  providers: [SubAdminDetailsService],
  exports: [SubAdminDetailsService],
})
export class CompanyDetailsModule {}
