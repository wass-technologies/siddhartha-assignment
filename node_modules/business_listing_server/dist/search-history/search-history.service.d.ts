import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { Repository } from 'typeorm';
import { SearchHistoryDto } from './dto/search-history.dto';
import { SearchHistory } from './entities/search-history.entity';
export declare class SearchHistoryService {
    private readonly repo;
    constructor(repo: Repository<SearchHistory>);
    create(createSearchHistoryDto: SearchHistoryDto): Promise<any>;
    findAllByUser(dto: CommonPaginationDto, accountId: string): Promise<{
        result: SearchHistory[];
        total: number;
    }>;
}
