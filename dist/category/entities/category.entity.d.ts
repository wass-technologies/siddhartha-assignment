import { BannerCategory } from 'src/banner-category/entities/banner-category.entity';
import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { CategoryType, DefaultStatus } from 'src/enum';
export declare class Category {
    id: string;
    name: string;
    image: string;
    imageName: string;
    status: DefaultStatus;
    type: CategoryType;
    createdAt: Date;
    updatedAt: Date;
    companyCategory: CompanyCategory[];
    bannerCategory: BannerCategory[];
}
