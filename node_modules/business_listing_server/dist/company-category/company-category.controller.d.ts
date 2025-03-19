import { CompanyCategoryService } from './company-category.service';
import { CompanyCategoryDto } from './dto/company-category.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class CompanyCategoryController {
    private readonly companyCategoryService;
    constructor(companyCategoryService: CompanyCategoryService);
    create(dto: CompanyCategoryDto, user: Account): Promise<any>;
    offer(id: string, offer: any): Promise<import("./entities/company-category.entity").CompanyCategory & {
        offer: number;
        isOffer: import("src/enum").YNStatus;
    }>;
    remove(id: string): Promise<import("./entities/company-category.entity").CompanyCategory>;
}
