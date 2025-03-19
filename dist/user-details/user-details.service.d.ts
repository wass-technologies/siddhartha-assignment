import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { PaginationSDto, UpdateUserDetailDto } from './dto/update-user-details';
import { UserDetail } from './entities/user-detail.entity';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';
export declare class UserDetailsService {
    private readonly repo;
    private readonly accountrepo;
    constructor(repo: Repository<UserDetail>, accountrepo: Repository<Account>);
    getProfile(id: string): Promise<UserDetail>;
    findAll(dto: PaginationSDto): Promise<{
        result: UserDetail[];
        total: number;
    }>;
    findOne(id: string): Promise<UserDetail>;
    update(dto: UpdateUserDetailDto, accountId: string): Promise<UserDetail & UpdateUserDetailDto>;
    updateUserStatus(userId: string, updateUserStatusDto: UpdateUserStatusDto): Promise<{
        message: string;
    }>;
    getUserStatus(userId: string): Promise<{
        id: string;
        name: string;
        role: import("../enum").UserRole;
        status: import("../enum").DefaultStatus;
    }>;
}
