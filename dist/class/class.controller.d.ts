import { ClassService } from './class.service';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    addClass(user: Account, schoolId: string, dto: CreateClassDto): Promise<import("./entities/class.entity").ClassEntity>;
    getAllClasses(user: Account, schoolId: string, dto: PaginationDto): Promise<{
        total: number;
        classes: import("./entities/class.entity").ClassEntity[];
    }>;
    getClassById(user: Account, classId: string): Promise<import("./entities/class.entity").ClassEntity>;
    getStudents(user: Account, classId: string, dto: PaginationDto): Promise<{
        result: import("../student/entities/student.entity").Student[];
        total: number;
    }>;
    removeClass(user: Account, schoolId: string, classId: string): Promise<{
        message: string;
    }>;
}
