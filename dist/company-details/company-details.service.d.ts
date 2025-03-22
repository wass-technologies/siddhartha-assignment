import { Repository } from 'typeorm';
import { PaginationDto, SchoolDetailDto } from './dto/company-detail.dto';
import { SchoolStatus } from 'src/enum';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from './entities/company-detail.entity';
export declare class SubAdminDetailsService {
    private readonly subAdminRepo;
    private readonly schoolRepo;
    constructor(subAdminRepo: Repository<SubAdmin>, schoolRepo: Repository<School>);
    private getSubAdminSchools;
    getSchoolDetails(accountId: string, paginationDto: PaginationDto): Promise<{
        total: number;
        limit: number;
        offset: number;
        data: School[];
    }>;
    updateSchoolDetails(accountId: string, schoolId: string, dto: SchoolDetailDto): Promise<{
        message: string;
        school: School;
    }>;
    updateSchoolStatus(accountId: string, schoolId: string, status: SchoolStatus): Promise<{
        message: string;
        result: {
            id: string;
            name: string;
            status: SchoolStatus;
        };
    }>;
}
