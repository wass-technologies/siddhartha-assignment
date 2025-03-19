import { BannerCategoryService } from './banner-category.service';
import { BannerCategoryPaginationDto, CreateBannerCategoryDto } from './dto/create-banner-category.dto';
export declare class BannerCategoryController {
    private readonly bannerCategoryService;
    constructor(bannerCategoryService: BannerCategoryService);
    create(dto: CreateBannerCategoryDto): Promise<{
        message: string;
    }>;
    findAll(dto: BannerCategoryPaginationDto): Promise<{
        result: import("./entities/banner-category.entity").BannerCategory[];
        count: number;
    }>;
    findByUser(dto: BannerCategoryPaginationDto): Promise<{
        result: import("./entities/banner-category.entity").BannerCategory[];
        count: number;
    }>;
    remove(id: string): Promise<import("./entities/banner-category.entity").BannerCategory>;
}
