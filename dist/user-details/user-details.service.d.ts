import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { AssignSubAdminDto, PaginationDto } from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { Response } from 'express';
import { ClassEntity } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
export declare class SchoolService {
    private readonly repo;
    private readonly accountrepo;
    private readonly classRepo;
    private readonly studentRepo;
    private subAdminRepository;
    constructor(repo: Repository<School>, accountrepo: Repository<Account>, classRepo: Repository<ClassEntity>, studentRepo: Repository<Student>, subAdminRepository: Repository<SubAdmin>);
    getSchoolDetails(userId: string): Promise<School>;
    getTotalClasses(userId: string, paginationDto: PaginationDto): Promise<{
        result: ClassEntity[];
        total: number;
    }>;
    getClassWiseStudentList(userId: string, classId: string, paginationDto: PaginationDto): Promise<{
        totalStudents: number;
        students: ClassEntity[];
    }>;
    getStudentById(userId: string, studentId: string): Promise<Student>;
    assignSubAdmin(dto: AssignSubAdminDto): Promise<School>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
