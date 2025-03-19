import { CreateCompanyKeywordDto } from './dto/create-company-keyword.dto';
import { CompanyKeyword } from './entities/company-keyword.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
export declare class CompanyKeywordService {
    private readonly repo;
    constructor(repo: Repository<CompanyKeyword>);
    create(dto: CreateCompanyKeywordDto, accountId: string): Promise<any[]>;
    findAll(dto: CommonPaginationDto, accountId: string): Promise<{
        result: CompanyKeyword[];
        count: number;
    }>;
    findOne(dto: CommonPaginationDto): Promise<{
        result: CompanyKeyword[];
        count: number;
    }>;
    remove(id: string, accountId: string): Promise<CompanyKeyword>;
}
