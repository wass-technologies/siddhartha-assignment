import { Account } from 'src/account/entities/account.entity';
import { SchoolDetailsService } from './company-details.service';
import { PaginationDto, SchoolDetailDto, StatusDto } from './dto/company-detail.dto';
import { Response } from 'express';
export declare class SchoolDetailsController {
    private readonly schoolDetailsService;
    constructor(schoolDetailsService: SchoolDetailsService);
    update(user: Account, dto: SchoolDetailDto): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    removeSubAdmin(schoolId: string): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    createSchool(user: Account, dto: SchoolDetailDto): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    assignSubAdmin(schoolId: string, subAdminId: string): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    getAllSchools(dto: PaginationDto): Promise<{
        result: import("./entities/company-detail.entity").SchoolDetails[];
        total: number;
    }>;
    status(id: string, dto: StatusDto): Promise<import("./entities/company-detail.entity").SchoolDetails & StatusDto>;
    generateSchoolListPdf(res: Response, user: Account): Promise<void>;
    getAllActiveSchools(paginationDto: PaginationDto): Promise<{
        data: import("./entities/company-detail.entity").SchoolDetails[];
        totalSchools: number;
        limit: number;
        offset: number;
    }>;
    getAllPendingSchools(paginationDto: PaginationDto): Promise<{
        data: import("./entities/company-detail.entity").SchoolDetails[];
        totalSchools: number;
        limit: number;
        offset: number;
    }>;
    getAllInactiveSchools(paginationDto: PaginationDto): Promise<{
        data: import("./entities/company-detail.entity").SchoolDetails[];
        totalSchools: number;
        limit: number;
        offset: number;
    }>;
    findSchool(id: string): Promise<import("./entities/company-detail.entity").SchoolDetails>;
}
