import { DefaultStatus } from 'src/enum';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { CreateAccountDto } from './dto/account.dto';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';
export declare class AccountService {
    private readonly repo;
    private readonly schoolRepo;
    private readonly subAdminRepo;
    private readonly staffRepo;
    constructor(repo: Repository<Account>, schoolRepo: Repository<School>, subAdminRepo: Repository<SubAdmin>, staffRepo: Repository<StaffDetail>);
    create(dto: CreateAccountDto, createdBy: string): Promise<any>;
    findAllAccounts(dto: PaginationDto): Promise<{
        result: Account[];
        total: number;
    }>;
    getLoggedInSubAdminDetails(accountId: number): Promise<Account>;
    getLoggedInSchoolDetails(accountId: number): Promise<Account>;
    getStaffDetails(accountId: number): Promise<Account>;
    updateAccountStatus(accountId: number, status: DefaultStatus): Promise<{
        message: string;
    }>;
    getAccountsByStatus(status: DefaultStatus, dto: PaginationDto): Promise<{
        result: Account[];
        total: number;
    }>;
}
