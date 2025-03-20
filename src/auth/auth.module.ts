import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from 'src/account/entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { HttpModule } from '@nestjs/axios';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { CaslAbilityFactory } from './factory/casl-ability.factory';
import { PermissionsGuard } from './guards/permissions.guard';
import { JwtStrategy } from './strategy/jwt.strategy';

import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';

import { StaffDetailsModule } from 'src/staff-details/staff-details.module';
import { School } from 'src/user-details/entities/user-detail.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      LoginHistory,
      UserPermission,
      School,
      CompanySchedule
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: process.env.BL_JWT_SECRET,
          signOptions: {
            expiresIn: process.env.BL_JWT_EXPIRE,
          },
        };
      },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),StaffDetailsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CaslAbilityFactory, PermissionsGuard],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    CaslAbilityFactory,
    PermissionsGuard,
  ],
})
export class AuthModule {}
