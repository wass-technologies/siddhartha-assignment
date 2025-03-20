import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { Account } from 'src/account/entities/account.entity';
import { School } from './entities/user-detail.entity';
import { SchoolController } from './user-details.controller';
import { SchoolService } from './user-details.service';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([School,Account,Auth]),
    AuthModule,
    MulterModule.register({ dest: './uploads/UserDetail' }),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class UserDetailsModule {}
