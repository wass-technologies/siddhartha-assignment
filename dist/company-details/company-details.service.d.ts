import { Repository } from 'typeorm';
import { PaginationDto } from './dto/company-detail.dto';
import { SchoolStatus } from 'src/enum';
import { ClassEntity } from 'src/class/entities/class.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
import { Student } from 'src/student/entities/student.entity';
import { SchoolDto } from 'src/user-details/dto/update-user-details';
export declare class SubAdminDetailsService {
    private readonly classRepo;
    private readonly schoolRepo;
    private readonly studentRepo;
    constructor(classRepo: Repository<ClassEntity>, schoolRepo: Repository<School>, studentRepo: Repository<Student>);
    getSchools(userId: string, paginationDto: PaginationDto): Promise<{
        total: number;
        schools: School[];
    }>;
    findSchool(userId: string, schoolId: string): Promise<School>;
    updateSchoolDetails(userId: string, schoolId: string, dto: SchoolDto): Promise<School>;
    updateSchoolStatus(userId: string, schoolId: string, status: SchoolStatus): Promise<School>;
    deleteSchool(userId: string, schoolId: string): Promise<{
        message: string;
    }>;
}
