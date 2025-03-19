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
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, LogType, LoginType, UserRole } from 'src/enum';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { Repository } from 'typeorm';
import { CreateDetailDto, signIn, StaffLoinDto, UpdateUserStatusDto } from './dto/login.dto';
import { companyScheduleData } from 'src/week-schedule';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { CreateMainAdminDto, CreateSubAdminDto, CreateUserDto, LoginDto } from 'src/account/dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
    @InjectRepository(LoginHistory)
    private readonly logRepo: Repository<LoginHistory>,
    @InjectRepository(UserPermission)
    private readonly upRepo: Repository<UserPermission>,
    @InjectRepository(SchoolDetails)
    private readonly companyDetailRepo: Repository<SchoolDetails>,
    @InjectRepository(UserPermission)
    private readonly userpermissionRepo: Repository<UserPermission>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepo: Repository<UserDetail>,
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
    const payload={
      id:user.id,
      email: user.email,
      role: user.role,
      status:user.status,
    }
    const token = this.jwtService.sign(payload);
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
  
    const token = this.jwtService.sign(payload);
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
    const payload={
      id:user.id,
      email:user.email,
      role:user.role
    }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    return { token };
  }

// Get User Details

private async getUserDetails(loginId: string, role: UserRole){
  const result = await this.accountRepo.findOne({
    where: { email: loginId, role: role },
    select: ['id', 'email', 'password', 'role', 'status'],
  });
  console.log('Fetched User:', result); 

  if (!result) {
    throw new UnauthorizedException('Account not found!');
  }

  return result;
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



 //Create User

  private async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
    createdBy?: string,
  ) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }
  
    const existingAccount = await this.accountRepo.findOne({
      where: { email: createUserDto.email },
    });
  
    if (existingAccount) {
      throw new ForbiddenException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    const account = await this.accountRepo.save({
      email: createUserDto.email,
      name:createUserDto.name,
      password: hashedPassword,
      role,
      createdBy,
      status: DefaultStatus.ACTIVE,
    });
  
    const userDetail = await this.userDetailRepo.save({
      email: createUserDto.email,
      name: createUserDto.name,
      accountId: account.id,
      assignedByAdminId: createdBy,
      status: DefaultStatus.ACTIVE,
    });
  
    return { account, userDetail };
  }
  





  // Create MainAdmin
  async createMainAdmin(dto: CreateMainAdminDto) {
    const existingAdmin = await this.accountRepo.findOne({
      where: { role: UserRole.MAIN_ADMIN },
    });

    if (existingAdmin) {
      throw new ForbiddenException('Main admin already exists');
    }

    return this.createUser(dto, UserRole.MAIN_ADMIN);
  }
  
//subadmin
  async createSubAdmin(dto: CreateSubAdminDto, createdBy: string,) {
  
    const school = await this.companyDetailRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) {
      throw new NotFoundException('School not found!');
    }
  
    if (school.subAdmin) {
      await this.accountRepo.delete(school.subAdmin.id);
    }
  
    const { account } = await this.createUser(dto, UserRole.SUB_ADMIN, createdBy);
 
    school.subAdmin = account;
    school.accountId = account.id;
    await this.companyDetailRepo.save(school);
    
  
    return { message: 'Sub Admin assigned to the school', account };
  }

  async createStaff(dto:CreateUserDto, createdBy: string) {
    return this.createUser(dto, UserRole.STAFF, createdBy);
  }


  
  
  

}
