import { Account } from 'src/account/entities/account.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
export declare class UserPermission {
    id: number;
    accountId: string;
    permissionId: number;
    status: boolean;
    updatedAt: Date;
    account: Account[];
    menu: Menu[];
    permission: Permission[];
}
