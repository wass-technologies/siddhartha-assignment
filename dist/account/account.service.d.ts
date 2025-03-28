import { DefaultStatus } from 'src/enum';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { ChangePasswordDto, CreateAccountDto } from './dto/account.dto';
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
    getSubAdminDetails(accountId: string): Promise<Account>;
    getSchoolDetails(accountId: string): Promise<Account>;
    getStaffDetails(accountId: string): Promise<Account>;
    checkUserStatus(accountId: string): Promise<{
        account: Account;
    }>;
    updateAccountStatus(accountId: string, status: DefaultStatus): Promise<{
        message: string;
    }>;
    changePassword(accountId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
