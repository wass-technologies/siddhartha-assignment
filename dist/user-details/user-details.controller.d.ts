import { SchoolStatus } from 'src/enum';
import { PaginationDto, SchoolDto } from './dto/update-user-details';
import { SchoolService } from './user-details.service';
import { Response } from 'express';
import { Account } from 'src/account/entities/account.entity';
import { School } from './entities/user-detail.entity';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    assignSubAdmin(schoolId: string, subAdminId: string, replaceExisting: boolean): Promise<{
        message: string;
        school: School;
    }>;
    getAllSchools(paginationDto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    getSchoolsForSubAdmin(user: Account, paginationDto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    getSchoolById(user: Account, schoolId: string): Promise<School>;
    updateSchool(user: Account, schoolId: string, updateSchoolDto: SchoolDto): Promise<School>;
    updateSchoolStatus(user: Account, schoolId: string, newStatus: SchoolStatus): Promise<School>;
    deleteSchool(user: Account, schoolId: string): Promise<void>;
    getSchoolByAccount(user: Account): Promise<School>;
    updateSchoolByAccount(user: Account, updateSchoolDto: SchoolDto): Promise<School>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
