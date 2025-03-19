import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    private readonly repo;
    private cacheManager;
    constructor(repo: Repository<Permission>, cacheManager: Cache);
    findAll(): Promise<Permission[]>;
}
