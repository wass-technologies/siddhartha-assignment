import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Account } from 'src/account/entities/account.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, UserRole } from 'src/enum';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { Repository } from 'typeorm';
import { CreateMainAdminDto, CreateSubAdminDto, CreateUserDto, LoginDto } from 'src/account/dto/account.dto';
export declare class AuthService {
    private jwtService;
    private readonly accountRepo;
    private readonly logRepo;
    private readonly upRepo;
    private readonly companyDetailRepo;
    private readonly userpermissionRepo;
    private readonly userDetailRepo;
    private cacheManager;
    constructor(jwtService: JwtService, accountRepo: Repository<Account>, logRepo: Repository<LoginHistory>, upRepo: Repository<UserPermission>, companyDetailRepo: Repository<SchoolDetails>, userpermissionRepo: Repository<UserPermission>, userDetailRepo: Repository<UserDetail>, cacheManager: Cache);
    mainAdmindminsignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    staffSignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    subAdminsignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    private getUserDetails;
    validate(id: string, role: UserRole): Promise<{
        roles: UserRole[];
        id: string;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        createdBy: string;
        status: DefaultStatus;
        createdAt: Date;
        updatedAt: Date;
        schools: SchoolDetails[];
        userPermission: UserPermission[];
        userDetail: UserDetail[];
    }>;
    findPermission(accountId: string): Promise<any>;
    private getPermissions;
    private createUser;
    createMainAdmin(dto: CreateMainAdminDto): Promise<{
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: DefaultStatus.ACTIVE;
        } & Account;
        userDetail: {
            email: string;
            name: string;
            accountId: string;
            assignedByAdminId: string;
            status: DefaultStatus;
        } & UserDetail;
    }>;
    createSubAdmin(dto: CreateSubAdminDto, createdBy: string): Promise<{
        message: string;
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: DefaultStatus.ACTIVE;
        } & Account;
    }>;
    createStaff(dto: CreateUserDto, createdBy: string): Promise<{
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: DefaultStatus.ACTIVE;
        } & Account;
        userDetail: {
            email: string;
            name: string;
            accountId: string;
            assignedByAdminId: string;
            status: DefaultStatus;
        } & UserDetail;
    }>;
}
