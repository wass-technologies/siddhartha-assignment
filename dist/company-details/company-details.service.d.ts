import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
export declare class SchoolDetailsService {
    private readonly accountRepo;
    constructor(accountRepo: Repository<Account>);
}
