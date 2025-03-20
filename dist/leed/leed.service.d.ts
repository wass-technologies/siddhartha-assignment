import { LeedPaginationDto, PdfLeadPaginationDto } from './dto/create-leed.dto';
import { Leed } from './entities/leed.entity';
import { Repository } from 'typeorm';
import { CallHistory } from 'src/call-history/entities/call-history.entity';
import { LeedStatus } from 'src/enum';
export declare class LeedService {
    private readonly repo;
    private readonly callHistoryRepo;
    constructor(repo: Repository<Leed>, callHistoryRepo: Repository<CallHistory>);
    findAll(dto: LeedPaginationDto, companyDetailId: string): Promise<{
        result: Leed[];
        count: number;
    }>;
    findByUser(dto: LeedPaginationDto, accountId: string): Promise<{
        result: Leed[];
        count: number;
    }>;
    pdf(dto: PdfLeadPaginationDto, companyDetailId: string): Promise<Leed[]>;
    leedCount(companyDetailId: string): Promise<{
        totalLeeds: number;
        newLeeds: number;
    }>;
    findByAdmin(dto: LeedPaginationDto, companyDetailId: string): Promise<{
        result: Leed[];
        count: number;
    }>;
    status(id: string, companyDetailId: string): Promise<Leed & {
        status: LeedStatus;
    }>;
}
