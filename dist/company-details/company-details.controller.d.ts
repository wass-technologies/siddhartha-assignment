import { SubAdminDetailsService } from './company-details.service';
import { PaginationDto, UpdateSubAdminDto } from './dto/company-detail.dto';
import { SubAdmin } from './entities/company-detail.entity';
export declare class SubAdminDetailsController {
    private readonly subAdminService;
    constructor(subAdminService: SubAdminDetailsService);
    getAllSubAdmins(paginationDto: PaginationDto): Promise<SubAdmin[]>;
    getSubAdminById(id: string): Promise<SubAdmin>;
    updateSubAdmin(id: string, updateSubAdminDto: UpdateSubAdminDto): Promise<SubAdmin>;
    deleteSubAdmin(id: string): Promise<void>;
    verifySubAdminAssociation(subAdminId: string, schoolId: string): Promise<boolean>;
}
