import { CallHistoryService } from './call-history.service';
import { CallHistoryPaginationDto } from './dto/create-call-history.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class CallHistoryController {
    private readonly callHistoryService;
    constructor(callHistoryService: CallHistoryService);
    findByUser(dto: CallHistoryPaginationDto, user: Account): Promise<{
        result: import("./entities/call-history.entity").CallHistory[];
        count: number;
    }>;
    findByAdmin(dto: CallHistoryPaginationDto, companyDetailId: string): Promise<{
        result: import("./entities/call-history.entity").CallHistory[];
        count: number;
    }>;
}
