import { Repository } from 'typeorm';
import { CompanyCategoryDto } from './dto/company-category.dto';
import { CompanyCategory } from './entities/company-category.entity';
import { YNStatus } from 'src/enum';
export declare class CompanyCategoryService {
    private readonly repo;
    constructor(repo: Repository<CompanyCategory>);
    create(dto: CompanyCategoryDto, accountId: string): Promise<any>;
    offer(id: string, offer: any): Promise<CompanyCategory & {
        offer: number;
        isOffer: YNStatus;
    }>;
    remove(id: string): Promise<CompanyCategory>;
}
