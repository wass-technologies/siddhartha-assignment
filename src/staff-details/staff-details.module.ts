import { Module } from '@nestjs/common';
import { StaffDetailsService } from './staff-details.service';
import { StaffDetailsController } from './staff-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffDetail } from './entities/staff-detail.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([StaffDetail]),
      
    ],
  
  controllers: [StaffDetailsController],
  providers: [StaffDetailsService],
})
export class StaffDetailsModule {}
