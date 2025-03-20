import { Module } from '@nestjs/common';
import { LeedService } from './leed.service';
import { LeedController } from './leed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leed } from './entities/leed.entity';
import { AuthModule } from 'src/auth/auth.module';

import { CallHistory } from 'src/call-history/entities/call-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leed, CallHistory]),
    AuthModule,
  ],
  controllers: [LeedController],
  providers: [LeedService],
})
export class LeedModule {}
