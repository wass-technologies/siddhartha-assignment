import { CreateClassDto } from './dto/create-class.dto';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { Student } from 'src/student/entities/student.entity';
export declare class ClassService {
    private readonly classRepo;
    private readonly schoolRepo;
    private readonly studentRepo;
    constructor(classRepo: Repository<ClassEntity>, schoolRepo: Repository<SchoolDetails>, studentRepo: Repository<Student>);
    addClass(subSchoolId: string, dto: CreateClassDto): Promise<ClassEntity>;
    deleteClass(subSchoolId: string, classId: string): Promise<void>;
    getAllClasses(schoolId: string, page?: number, pageSize?: number): Promise<{
        classes: {
            classId: string;
            className: string;
            schoolId: string;
            schoolName: string;
        }[];
        totalClass: number;
        totalPage: number;
        currentPage: number;
        hasNextPage: boolean;
    }>;
    getStudentsByClass(classId: string, user: Account, page?: number, pageSize?: number): Promise<{
        classId: string;
        className: string;
        schoolId: string;
        schoolName: string;
        students: Student[];
        totalStudents: number;
        totalPage: number;
        currentPage: number;
        hasNextPage: boolean;
    }>;
}
