import { Repository } from 'typeorm';
import { SchoolDetailDto } from './dto/company-detail.dto';
import { SchoolStatus } from 'src/enum';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from './entities/company-detail.entity';
export declare class SubAdminDetailsService {
    private readonly subAdminRepo;
    private readonly schoolRepo;
    constructor(subAdminRepo: Repository<SubAdmin>, schoolRepo: Repository<School>);
    private getSubAdminSchool;
    getSchoolDetails(accountId: string): Promise<School>;
    updateSchoolDetails(accountId: string, dto: SchoolDetailDto): Promise<{
        message: string;
        school: School;
    }>;
    updateSchoolStatus(accountId: string, status: SchoolStatus): Promise<{
        message: string;
        result: {
            id: string;
            name: string;
            status: SchoolStatus;
        };
    }>;
}
