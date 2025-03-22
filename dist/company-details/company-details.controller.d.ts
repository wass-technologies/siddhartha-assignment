import { Account } from 'src/account/entities/account.entity';
import { SchoolStatus } from 'src/enum';
import { SubAdminDetailsService } from './company-details.service';
import { SchoolDetailDto, StatusDto } from './dto/company-detail.dto';
export declare class SubAdminDetailsController {
    private readonly subAdminService;
    constructor(subAdminService: SubAdminDetailsService);
    getSchoolDetails(user: Account): Promise<import("../user-details/entities/user-detail.entity").School>;
    updateSchoolDetails(user: Account, dto: SchoolDetailDto): Promise<{
        message: string;
        school: import("../user-details/entities/user-detail.entity").School;
    }>;
    updateSchoolStatus(user: Account, dto: StatusDto): Promise<{
        message: string;
        result: {
            id: string;
            name: string;
            status: SchoolStatus;
        };
    }>;
}
