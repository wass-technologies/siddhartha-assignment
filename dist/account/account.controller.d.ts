import { MenusService } from 'src/menus/menus.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { CreateAccountDto } from './dto/account.dto';
export declare class AccountController {
    private readonly accountService;
    private readonly menuService;
    private readonly permissionService;
    private readonly userPermService;
    constructor(accountService: AccountService, menuService: MenusService, permissionService: PermissionsService, userPermService: UserPermissionsService);
    create(dto: CreateAccountDto, user: Account): Promise<any>;
    findAllSubAdmins(dto: PaginationDto): Promise<any>;
    subAdminDetail(id: string): Promise<any>;
    staffDetail(id: string): Promise<any>;
    getAllAccounts(dto: PaginationDto): Promise<any>;
    getLoggedInSubAdmin(id: string): Promise<any>;
    getLoggedInSchool(id: string): Promise<any>;
    getStaffAccount(id: string): Promise<any>;
    updateAccountStatus(id: string, status: string): Promise<{
        message: string;
    }>;
}
