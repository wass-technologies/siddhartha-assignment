import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { SearchHistoryService } from './search-history.service';
import { Account } from 'src/account/entities/account.entity';
export declare class SearchHistoryController {
    private readonly searchHistoryService;
    constructor(searchHistoryService: SearchHistoryService);
    findAllByUser(user: Account, dto: CommonPaginationDto): Promise<{
        result: import("./entities/search-history.entity").SearchHistory[];
        total: number;
    }>;
}
