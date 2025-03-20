import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Account } from 'src/account/entities/account.entity';
import { UserRole } from 'src/enum';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/account/dto/account.dto';
export declare class AuthService {
    private jwtService;
    private readonly accountRepo;
    private readonly logRepo;
    private readonly upRepo;
    private readonly userpermissionRepo;
    private cacheManager;
    constructor(jwtService: JwtService, accountRepo: Repository<Account>, logRepo: Repository<LoginHistory>, upRepo: Repository<UserPermission>, userpermissionRepo: Repository<UserPermission>, cacheManager: Cache);
    mainAdmindminsignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    staffSignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    subAdminsignIn(dto: LoginDto): Promise<{
        token: string;
    }>;
    validate(id: string, role: UserRole): Promise<any>;
    findPermission(accountId: string): Promise<any>;
    private getPermissions;
    private getUserDetails;
}
