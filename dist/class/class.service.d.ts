import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Student } from 'src/student/entities/student.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class ClassService {
    private readonly classRepo;
    private readonly schoolRepo;
    private readonly studentRepo;
    constructor(classRepo: Repository<ClassEntity>, schoolRepo: Repository<School>, studentRepo: Repository<Student>);
    addClass(userId: string, schoolId: string, dto: CreateClassDto): Promise<ClassEntity>;
    getAllClasses(userId: string, schoolId: string, dto: PaginationDto): Promise<{
        total: number;
        classes: ClassEntity[];
    }>;
    getClassById(userId: string, classId: string): Promise<ClassEntity>;
    getStudents(dto: PaginationDto, classId: string, user: Account): Promise<{
        result: Student[];
        total: number;
    }>;
    remove(user: Account, schoolId: string, classId: string): Promise<{
        message: string;
    }>;
}
