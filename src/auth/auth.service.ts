import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Account } from 'src/account/entities/account.entity';

import { DefaultStatus, LogType, LoginType, UserRole } from 'src/enum';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { Repository } from 'typeorm';
import { CreateDetailDto, signIn, StaffLoinDto, UpdateUserStatusDto } from './dto/login.dto';
import { companyScheduleData } from 'src/week-schedule';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import {  LoginDto } from 'src/account/dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
    @InjectRepository(LoginHistory)
    private readonly logRepo: Repository<LoginHistory>,
    @InjectRepository(UserPermission)
    private readonly upRepo: Repository<UserPermission>,

    @InjectRepository(UserPermission)
    private readonly userpermissionRepo: Repository<UserPermission>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    
    
  ) {}

  //SignIn

  async mainAdmindminsignIn(dto:LoginDto) {
    const user = await this.getUserDetails(dto.email, UserRole.MAIN_ADMIN);
    if (!user) {
      throw new UnauthorizedException('Account not found or incorrect role!');
    }
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    return { token };
  }


  //Staff Login
  async staffSignIn(dto: LoginDto) {
    const user = await this.getUserDetails(dto.email, UserRole.STAFF);
    if (!user) {
      throw new UnauthorizedException('Account not found or incorrect role!');
    }
  
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  
    const permissions = await this.getPermissions(user.id);
  
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      status:user.status
    };
  
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    return { token };
  }

  //login subadmin

  async subAdminsignIn(dto:LoginDto) {
    const user = await this.getUserDetails(dto.email, UserRole.SUB_ADMIN);
    if (!user) {
      throw new UnauthorizedException('Account not found or incorrect role!');
    }
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    return { token };
  }

  //login School

  async schoolLoin(dto:LoginDto){
    const user = await this.getUserDetails(dto.email,UserRole.SCHOOL);
    if (!user) {
      throw new UnauthorizedException('Account not found or incorrect role!');
    }
    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token= await APIFeatures.assignJwtToken(user.id, this.jwtService);
    return { token };
    
  }





//Validate
async validate(id: string, role: UserRole) {
  const user = await this.getUserDetails(id, role);

  if (!user) {
    throw new UnauthorizedException('User not found!');
  }

  return {
    ...user,
    roles: [user.role], 
  };
}


// Find Permission
  findPermission(accountId: string) {
    return this.getPermissions(accountId);
  }

  private getPermissions = async (accountId: string): Promise<any> => {
    let result = await this.cacheManager.get('userPermission' + accountId);
    if (!result) {
      result = await this.upRepo.find({
        relations: ['permission', 'menu'],
        where: { accountId, status: true },
      });
      this.cacheManager.set(
        'userPermission' + accountId,
        result,
        7 * 24 * 60 * 60 * 1000,
      );
    }
    return result;
  };
  

  // Get User Details

  private getUserDetails = async (
    loginId: string,
    role?: UserRole,
  ): Promise<any> => {
    const query = this.accountRepo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.schools', 'schools')
      .leftJoinAndSelect('account.subAdmins', 'subAdmins') 
      .leftJoinAndSelect('account.staffDetails', 'staffDetails')
      .select([
        'account.id',
        'account.email',
        'account.password',
        'account.role',
        'account.status',
        'schools.id',
        'schools.name', 
        'schools.status',
        'subAdmins.id',
        'subAdmins.name',
        'staffDetails.id', 
        'staffDetails.name',
        'staffDetails.email',
      ]);
  
    if (role) {
      query.andWhere('account.role = :role', { role });
    }
  
    const result = await query
      .andWhere('account.email = :loginId', { loginId })
      .getOne();
  
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
  
    return result;
  };
  


  
  
  

}
