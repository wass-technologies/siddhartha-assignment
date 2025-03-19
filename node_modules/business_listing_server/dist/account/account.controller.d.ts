import { MenusService } from 'src/menus/menus.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { SearchHistoryService } from 'src/search-history/search-history.service';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
export declare class AccountController {
    private readonly accountService;
    private readonly searchHistoryService;
    private readonly menuService;
    private readonly permissionService;
    private readonly userPermService;
    constructor(accountService: AccountService, searchHistoryService: SearchHistoryService, menuService: MenusService, permissionService: PermissionsService, userPermService: UserPermissionsService);
    getAllSubAdmins(paginationDto: PaginationDto): Promise<{
        result: Account[];
        total: number;
    }>;
    getSubAdminById(id: string): Promise<Account>;
    getStaffById(id: string): Promise<Account>;
}
