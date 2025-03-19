import { UpdatePermissionDto } from './dto/permission.dto';
import { UserPermissionsService } from './user-permissions.service';
export declare class UserPermissionsController {
    private readonly userPermissionsService;
    constructor(userPermissionsService: UserPermissionsService);
    update(id: string, dto: UpdatePermissionDto): Promise<{
        menu: import("./dto/permission.dto").MenuDto[];
    }>;
}
