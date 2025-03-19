import { Repository } from 'typeorm';
import { LoginHistory } from './entities/login-history.entity';
export declare class LoginHistoryService {
    private readonly repo;
    constructor(repo: Repository<LoginHistory>);
    findAll(limit: number, offset: number, accountId: string): Promise<{
        result: LoginHistory[];
        total: number;
    }>;
}
