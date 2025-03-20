import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { PaginationDto, PaginationSDto, SchoolDto, StatusDto } from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { Response } from 'express';
export declare class SchoolService {
    private readonly repo;
    private readonly accountrepo;
    constructor(repo: Repository<School>, accountrepo: Repository<Account>);
    createSchool(dto: SchoolDto): Promise<School>;
    findList(dto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    findListByStatus(dto: PaginationSDto): Promise<{
        result: School[];
        total: number;
    }>;
    findSchool(id: string): Promise<School>;
    update(id: string, dto: SchoolDto): Promise<School & SchoolDto>;
    status(id: string, dto: StatusDto): Promise<School & StatusDto>;
    deleteSchool(id: string): Promise<{
        message: string;
    }>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
