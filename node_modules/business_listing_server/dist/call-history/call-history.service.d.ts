import { CallHistoryPaginationDto } from './dto/create-call-history.dto';
import { CallHistory } from './entities/call-history.entity';
import { Repository } from 'typeorm';
export declare class CallHistoryService {
    private readonly repo;
    constructor(repo: Repository<CallHistory>);
    findAll(dto: CallHistoryPaginationDto, companyDetailId: string): Promise<{
        result: CallHistory[];
        count: number;
    }>;
    findByUser(dto: CallHistoryPaginationDto, accountId: string): Promise<{
        result: CallHistory[];
        count: number;
    }>;
    findByAdmin(dto: CallHistoryPaginationDto, companyDetailId: string): Promise<{
        result: CallHistory[];
        count: number;
    }>;
}
