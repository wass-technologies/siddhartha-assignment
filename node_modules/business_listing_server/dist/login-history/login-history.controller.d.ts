import { Account } from 'src/account/entities/account.entity';
import { PaginationDto } from './dto/pagination.dto';
import { LoginHistoryService } from './login-history.service';
export declare class LoginHistoryController {
    private readonly loginHistoryService;
    constructor(loginHistoryService: LoginHistoryService);
    findAllByUser(query: PaginationDto, id: string): Promise<{
        result: import("./entities/login-history.entity").LoginHistory[];
        total: number;
    }>;
    findAll(query: PaginationDto, user: Account): Promise<{
        result: import("./entities/login-history.entity").LoginHistory[];
        total: number;
    }>;
}
