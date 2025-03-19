import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
export declare class Menu {
    id: number;
    name: string;
    title: string;
    userPermission: UserPermission[];
}
