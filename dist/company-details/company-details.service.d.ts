import { Repository } from 'typeorm';
import { PaginationDto, UpdateSubAdminDto } from './dto/company-detail.dto';
import { School } from 'src/user-details/entities/user-detail.entity';
import { SubAdmin } from './entities/company-detail.entity';
export declare class SubAdminDetailsService {
    private readonly subAdminRepo;
    private readonly schoolRepo;
    constructor(subAdminRepo: Repository<SubAdmin>, schoolRepo: Repository<School>);
    getAllSubAdmins(paginationDto: PaginationDto): Promise<SubAdmin[]>;
    getSubAdminById(id: string): Promise<SubAdmin>;
    updateSubAdmin(id: string, updateSubAdminDto: UpdateSubAdminDto): Promise<SubAdmin>;
    deleteSubAdmin(id: string): Promise<void>;
    verifySubAdminAssociation(subAdminId: string, schoolId: string): Promise<boolean>;
}
