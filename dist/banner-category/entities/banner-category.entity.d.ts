import { Banner } from 'src/banner/entities/banner.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class BannerCategory {
    id: string;
    bannerId: string;
    categoryId: string;
    banner: Banner[];
    category: Category[];
}
