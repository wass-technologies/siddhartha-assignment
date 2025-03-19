import { AuthService } from './auth.service';
import { UserRole } from 'src/enum';
import { signIn } from './dto/login.dto';
import { CreateMainAdminDto, CreateSubAdminDto, CreateUserDto } from 'src/account/dto/account.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    mainAdminLogin(dto: signIn): Promise<{
        token: string;
    }>;
    subAdminLogin(dto: signIn): Promise<{
        token: string;
    }>;
    staffLogin(dto: signIn): Promise<{
        token: string;
    }>;
    createMainAdmin(dto: CreateMainAdminDto): Promise<{
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: import("src/enum").DefaultStatus.ACTIVE;
        } & import("../account/entities/account.entity").Account;
        userDetail: {
            email: string;
            name: string;
            accountId: string;
            assignedByAdminId: string;
            status: import("src/enum").DefaultStatus;
        } & import("../user-details/entities/user-detail.entity").UserDetail;
    }>;
    createSUbadmin(dto: CreateSubAdminDto): Promise<{
        message: string;
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: import("src/enum").DefaultStatus.ACTIVE;
        } & import("../account/entities/account.entity").Account;
    }>;
    createStaff(dto: CreateUserDto): Promise<{
        account: {
            email: string;
            name: string;
            password: string;
            role: UserRole;
            createdBy: string;
            status: import("src/enum").DefaultStatus.ACTIVE;
        } & import("../account/entities/account.entity").Account;
        userDetail: {
            email: string;
            name: string;
            accountId: string;
            assignedByAdminId: string;
            status: import("src/enum").DefaultStatus;
        } & import("../user-details/entities/user-detail.entity").UserDetail;
    }>;
}
