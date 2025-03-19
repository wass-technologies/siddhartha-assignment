import { CompanyKeywordService } from './company-keyword.service';
import { CreateCompanyKeywordDto } from './dto/create-company-keyword.dto';
import { Account } from 'src/account/entities/account.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
export declare class CompanyKeywordController {
    private readonly companyKeywordService;
    constructor(companyKeywordService: CompanyKeywordService);
    create(dto: CreateCompanyKeywordDto, user: Account): Promise<any[]>;
    findAll(dto: CommonPaginationDto, user: Account): Promise<{
        result: import("./entities/company-keyword.entity").CompanyKeyword[];
        count: number;
    }>;
    remove(id: string, user: Account): Promise<import("./entities/company-keyword.entity").CompanyKeyword>;
}
