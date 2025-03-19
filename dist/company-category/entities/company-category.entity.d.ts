import { Category } from 'src/category/entities/category.entity';
import { YNStatus } from 'src/enum';
export declare class CompanyCategory {
    id: string;
    accountId: string;
    categoryId: string;
    offer: number;
    isOffer: YNStatus;
    createdAt: Date;
    updatedAt: Date;
    category: Category[];
}
