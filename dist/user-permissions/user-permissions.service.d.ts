import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CreateUserPermissionDto, UpdateUserPermissionDto } from './dto/permission.dto';
import { UserPermission } from './entities/user-permission.entity';
export declare class UserPermissionsService {
    private readonly repo;
    private readonly cacheManager;
    constructor(repo: Repository<UserPermission>, cacheManager: Cache);
    create(dto: CreateUserPermissionDto[]): Promise<(CreateUserPermissionDto & UserPermission)[]>;
    update(dto: UpdateUserPermissionDto[]): Promise<(UpdateUserPermissionDto & UserPermission)[]>;
    private delPermissions;
}
