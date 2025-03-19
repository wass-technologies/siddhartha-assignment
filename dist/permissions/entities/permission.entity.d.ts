import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
export declare class Permission {
    id: number;
    name: string;
    userPermission: UserPermission[];
}
