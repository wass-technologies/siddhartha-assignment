import { Repository } from 'typeorm';
import { CompanySubCategoryDto } from './dto/company-sub-category.dto';
import { CompanySubCategory } from './entities/company-sub-category.entity';
export declare class CompanySubCategoryService {
    private readonly repo;
    constructor(repo: Repository<CompanySubCategory>);
    create(dto: CompanySubCategoryDto): Promise<({
        accountId: string;
        subCategoryId: string;
    } & CompanySubCategory)[]>;
    remove(id: string): Promise<CompanySubCategory>;
}
