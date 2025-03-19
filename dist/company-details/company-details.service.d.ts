import { Repository } from 'typeorm';
import { PaginationDto, PaginationSDto, SchoolDetailDto, StatusDto } from './dto/company-detail.dto';
import { SchoolDetails } from './entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { Response } from 'express';
export declare class SchoolDetailsService {
    private readonly repo;
    private readonly accountRepo;
    constructor(repo: Repository<SchoolDetails>, accountRepo: Repository<Account>);
    createSchool(dto: SchoolDetailDto): Promise<SchoolDetails>;
    findList(dto: PaginationDto): Promise<{
        result: SchoolDetails[];
        total: number;
    }>;
    findListByStatus(dto: PaginationSDto): Promise<{
        result: SchoolDetails[];
        total: number;
    }>;
    findSchool(id: string): Promise<SchoolDetails>;
    update(id: string, dto: SchoolDetailDto): Promise<SchoolDetails & SchoolDetailDto>;
    status(id: string, dto: StatusDto): Promise<SchoolDetails & StatusDto>;
    deleteSchool(id: string): Promise<{
        message: string;
    }>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
