import { PaginationDto } from './dto/create-class.dto';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { UserRole } from 'src/enum';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class ClassService {
    private readonly classRepo;
    private readonly schoolRepo;
    private readonly studentRepo;
    constructor(classRepo: Repository<ClassEntity>, schoolRepo: Repository<School>, studentRepo: Repository<Student>);
    verifyUserAccess(userId: string, schoolId: string, userRole: UserRole): Promise<void>;
    addClassToSchool(userId: string, schoolId: string, className: string, userRole: UserRole): Promise<ClassEntity>;
    getAllClassesForSchool(userId: string, schoolId: string, userRole: UserRole, paginationDto: PaginationDto): Promise<{
        total: number;
        classes: ClassEntity[];
    }>;
    getClassById(userId: string, classId: string, userRole: UserRole): Promise<ClassEntity>;
    updateClass(userId: string, classId: string, className: string, userRole: UserRole): Promise<ClassEntity>;
    deleteClass(userId: string, classId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    getStudentsInClass(userId: string, classId: string, userRole: UserRole, paginationDto: PaginationDto): Promise<{
        total: number;
        students: Student[];
    }>;
}
