import { CreateLeedDto, LeedPaginationDto, PdfLeadPaginationDto } from './dto/create-leed.dto';
import { Leed } from './entities/leed.entity';
import { Repository } from 'typeorm';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { CallHistory } from 'src/call-history/entities/call-history.entity';
import { LeedStatus } from 'src/enum';
export declare class LeedService {
    private readonly repo;
    private readonly userDetailRepo;
    private readonly callHistoryRepo;
    constructor(repo: Repository<Leed>, userDetailRepo: Repository<UserDetail>, callHistoryRepo: Repository<CallHistory>);
    create(dto: CreateLeedDto, companyDetailId: string, accountId: string): Promise<any>;
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
