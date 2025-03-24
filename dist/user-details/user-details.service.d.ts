import { Repository } from 'typeorm';
import { PaginationDto, SchoolDto } from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { Response } from 'express';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { SchoolStatus, UserRole } from 'src/enum';
export declare class SchoolService {
    private readonly schoolRepo;
    private subAdminRepo;
    constructor(schoolRepo: Repository<School>, subAdminRepo: Repository<SubAdmin>);
    private getSubAdminIdByAccountId;
    private verifySubAdminOwnership;
    assignSubAdmin(schoolId: string, subAdminId: string, replaceExisting: boolean): Promise<{
        message: string;
        school: School;
    }>;
    getAllSchools(paginationDto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    getSchoolByAccountId(accountId: string): Promise<School>;
    getSchoolsForSubAdmin(accountId: string, paginationDto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    getSchoolById(accountId: string, schoolId: string, role: UserRole): Promise<School>;
    updateSchool(accountId: string, schoolId: string, updateSchoolDto: SchoolDto, role: UserRole): Promise<School>;
    updateSchoolStatus(accountId: string, schoolId: string, newStatus: SchoolStatus, role: UserRole): Promise<School>;
    updateSchoolByAccountId(accountId: string, updateSchoolDto: SchoolDto): Promise<School>;
    deleteSchool(accountId: string, schoolId: string): Promise<void>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
