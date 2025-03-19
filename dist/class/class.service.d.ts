import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
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
    addClass(schoolId: string, dto: CreateClassDto): Promise<ClassEntity>;
    getAllClasses(dto: PaginationDto, schoolId: string): Promise<{
        result: ClassEntity[];
        total: number;
    }>;
    getClassById(classId: string): Promise<ClassEntity>;
    getStudents(dto: PaginationDto, classId: string, user: Account): Promise<{
        result: Student[];
        total: number;
    }>;
    update(classId: string, dto: UpdateClassDto): Promise<{
        message: string;
    }>;
    remove(schoolId: string, classId: string): Promise<{
        message: string;
    }>;
}
