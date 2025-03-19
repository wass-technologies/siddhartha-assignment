import { Repository } from 'typeorm';
import { PaginationDto, SchoolDetailDto, StatusDto } from './dto/company-detail.dto';
import { SchoolDetails } from './entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus } from 'src/enum';
import { Response } from 'express';
export declare class SchoolDetailsService {
    private readonly repo;
    private readonly accountRepo;
    constructor(repo: Repository<SchoolDetails>, accountRepo: Repository<Account>);
    createSchool(dto: SchoolDetailDto): Promise<SchoolDetails>;
    updateSchool(schoolId: string, dto: SchoolDetailDto): Promise<SchoolDetails>;
    assignSubAdmin(schoolId: string, subAdminId: string): Promise<SchoolDetails>;
    removeSubAdmin(schoolId: string): Promise<SchoolDetails>;
    findSchools(dto: PaginationDto): Promise<{
        result: SchoolDetails[];
        total: number;
    }>;
    getSchoolsByStatus(status: SchoolStatus, paginationDto: PaginationDto): Promise<{
        data: SchoolDetails[];
        totalSchools: number;
        limit: number;
        offset: number;
    }>;
    findSchool(id: string): Promise<SchoolDetails>;
    updateStatus(schoolId: string, dto: StatusDto): Promise<SchoolDetails & StatusDto>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
