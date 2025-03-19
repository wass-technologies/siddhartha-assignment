import { BannerCategory } from 'src/banner-category/entities/banner-category.entity';
import { DefaultStatus } from 'src/enum';
export declare class Banner {
    id: string;
    image: string;
    imagePath: string;
    status: DefaultStatus;
    createdAt: Date;
    updatedAt: Date;
    bannerCategory: BannerCategory[];
}
