import { LeedService } from './leed.service';
import { CreateLeedDto, LeedPaginationDto } from './dto/create-leed.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class LeedController {
    private readonly leedService;
    constructor(leedService: LeedService);
    create(companyDetailId: string, dto: CreateLeedDto, user: Account): Promise<any>;
    findByUser(dto: LeedPaginationDto, user: Account): Promise<{
        result: import("./entities/leed.entity").Leed[];
        count: number;
    }>;
}
