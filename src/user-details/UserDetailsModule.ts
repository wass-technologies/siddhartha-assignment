import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AuthModule } from 'src/auth/auth.module';
import { School } from './entities/user-detail.entity';
import { SchoolController } from './user-details.controller';
import { SchoolService } from './user-details.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([School, Account]),
    AuthModule,
    MulterModule.register({ dest: './uploads/UserDetail' }),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class UserDetailsModule {
}
