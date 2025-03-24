import { DefaultStatus } from 'src/enum';
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
    getAllAccounts(dto: PaginationDto): Promise<{
        result: Account[];
        total: number;
    }>;
    getSubAdminAccount(user: Account): Promise<Account>;
    getAccount(user: Account): Promise<Account>;
    getStaffAccount(user: Account): Promise<Account>;
    updateAccountStatus(id: string, status: DefaultStatus): Promise<{
        message: string;
    }>;
}
