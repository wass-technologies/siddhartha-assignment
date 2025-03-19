import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { PageDto } from './dto/page.dto';
import { Page } from './entities/page.entity';
export declare class PagesService {
    private readonly repo;
    private cacheManager;
    constructor(repo: Repository<Page>, cacheManager: Cache);
    findAll(): Promise<Page[]>;
    findOne(id: number): Promise<unknown>;
    update(id: number, updatePageDto: PageDto): Promise<PageDto & Page>;
    private delPage;
    private getPage;
}
