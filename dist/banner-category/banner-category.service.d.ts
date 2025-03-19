import { BannerCategoryPaginationDto, CreateBannerCategoryDto } from './dto/create-banner-category.dto';
import { BannerCategory } from './entities/banner-category.entity';
import { Repository } from 'typeorm';
export declare class BannerCategoryService {
    private readonly repo;
    constructor(repo: Repository<BannerCategory>);
    create(dto: CreateBannerCategoryDto): Promise<{
        message: string;
    }>;
    findAll(dto: BannerCategoryPaginationDto): Promise<{
        result: BannerCategory[];
        count: number;
    }>;
    findByUser(dto: BannerCategoryPaginationDto): Promise<{
        result: BannerCategory[];
        count: number;
    }>;
    remove(id: string): Promise<BannerCategory>;
}
