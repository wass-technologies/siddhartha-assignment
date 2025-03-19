import { ClassService } from './class.service';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    addClass(subSchoolId: string, dto: CreateClassDto): Promise<import("./entities/class.entity").ClassEntity>;
    getAllClasses(dto: PaginationDto, schoolId: string): Promise<{
        result: import("./entities/class.entity").ClassEntity[];
        total: number;
    }>;
    getClassById(classId: string): Promise<import("./entities/class.entity").ClassEntity>;
    getStudents(dto: PaginationDto, classId: string, user: Account): Promise<{
        result: import("../student/entities/student.entity").Student[];
        total: number;
    }>;
    updateClass(classId: string, dto: UpdateClassDto): Promise<{
        message: string;
    }>;
    removeClass(schoolId: string, classId: string): Promise<{
        message: string;
    }>;
}
