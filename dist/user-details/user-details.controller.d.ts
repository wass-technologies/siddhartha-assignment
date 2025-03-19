import { Account } from 'src/account/entities/account.entity';
import { UserRole } from 'src/enum';
import { PaginationSDto, UpdateUserDetailDto } from './dto/update-user-details';
import { UserDetailsService } from './user-details.service';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';
export declare class UserDetailsController {
    private readonly userDetailsService;
    constructor(userDetailsService: UserDetailsService);
    findAll(dto: PaginationSDto): Promise<{
        result: import("./entities/user-detail.entity").UserDetail[];
        total: number;
    }>;
    profile(user: Account): Promise<import("./entities/user-detail.entity").UserDetail>;
    update(dto: UpdateUserDetailDto, user: Account): Promise<import("./entities/user-detail.entity").UserDetail & UpdateUserDetailDto>;
    updateUserStatus(userId: string, updateUserStatusDto: UpdateUserStatusDto): Promise<{
        message: string;
    }>;
    getUserStatus(userId: string): Promise<{
        id: string;
        name: string;
        role: UserRole;
        status: import("src/enum").DefaultStatus;
    }>;
}
