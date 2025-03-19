import { CompanySubCategoryService } from './company-sub-category.service';
import { CompanySubCategoryDto } from './dto/company-sub-category.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class CompanySubCategoryController {
    private readonly companySubCategoryService;
    constructor(companySubCategoryService: CompanySubCategoryService);
    create(user: Account, dto: CompanySubCategoryDto): Promise<({
        accountId: string;
        subCategoryId: string;
    } & import("./entities/company-sub-category.entity").CompanySubCategory)[]>;
    remove(id: string): Promise<import("./entities/company-sub-category.entity").CompanySubCategory>;
}
