import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
export declare class MenusService {
    private readonly repo;
    private cacheManager;
    constructor(repo: Repository<Menu>, cacheManager: Cache);
    findAll(): Promise<Menu[]>;
}
