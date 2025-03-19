export declare class CreateUserPermissionDto {
    accountId: string;
    menuId: number;
    permissionId: number;
}
export declare class PermissionDto {
    id: number;
}
export declare class UserPermissionDto {
    id: number;
    accountId: string;
    menuId: number;
    permissionId: number;
    status: boolean;
    permission: PermissionDto;
}
export declare class MenuDto {
    id: number;
    userPermission: UserPermissionDto[];
}
export declare class UpdatePermissionDto {
    menu: MenuDto[];
}
export declare class UpdateUserPermissionDto {
    id: number;
    accountId: string;
    menuId: number;
    permissionId: number;
    status: boolean;
}
