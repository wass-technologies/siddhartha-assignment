import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
export declare class AccountService {
    private readonly repo;
    constructor(repo: Repository<Account>);
    findAllSubAdmins(dto: PaginationDto): Promise<{
        result: Account[];
        total: number;
    }>;
    subAdminDetail(id: string): Promise<Account>;
    staffDetail(id: string): Promise<Account>;
}
