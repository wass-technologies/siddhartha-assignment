import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus } from 'src/enum';
import { SubAdminDetailsService } from './company-details.service';
import { PaginationDto } from './dto/company-detail.dto';
import { SchoolDto } from 'src/user-details/dto/update-user-details';
export declare class SubAdminDetailsController {
    private readonly schoolService;
    constructor(schoolService: SubAdminDetailsService);
    getSubAdminSchools(paginationDto: PaginationDto, user: Account): Promise<{
        total: number;
        schools: import("../user-details/entities/user-detail.entity").School[];
    }>;
    findSchool(schoolId: string, user: Account): Promise<import("../user-details/entities/user-detail.entity").School>;
    updateSchoolDetails(schoolId: string, dto: SchoolDto, user: Account): Promise<import("../user-details/entities/user-detail.entity").School>;
    updateSchoolStatus(schoolId: string, status: SchoolStatus, user: Account): Promise<import("../user-details/entities/user-detail.entity").School>;
    deleteSchool(schoolId: string, user: Account): Promise<{
        message: string;
    }>;
}
