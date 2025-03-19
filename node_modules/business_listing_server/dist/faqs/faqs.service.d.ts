import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
import { Repository } from 'typeorm';
import { FaqDto } from './dto/faq.dto';
import { Faq } from './entities/faq.entity';
export declare class FaqsService {
    private readonly repo;
    constructor(repo: Repository<Faq>);
    create(dto: FaqDto): Promise<any>;
    findAll(dto: DefaultStatusPaginationDto): Promise<{
        result: Faq[];
        total: number;
    }>;
    find(dto: CommonPaginationDto): Promise<{
        result: Faq[];
        total: number;
    }>;
    update(id: string, dto: FaqDto): Promise<Faq & FaqDto>;
    status(id: string, dto: DefaultStatusDto): Promise<Faq & DefaultStatusDto>;
}
