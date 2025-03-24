import { ClassService } from './class.service';
import { CreateClassDto, PaginationDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    addClass(user: Account, createClassDto: CreateClassDto): Promise<import("./entities/class.entity").ClassEntity>;
    getAllClasses(user: Account, paginationDto: PaginationDto, schoolId: string): Promise<{
        total: number;
        classes: import("./entities/class.entity").ClassEntity[];
    }>;
    getClassById(user: Account, classId: string): Promise<import("./entities/class.entity").ClassEntity>;
    updateClass(user: Account, classId: string, updateClassDto: UpdateClassDto): Promise<import("./entities/class.entity").ClassEntity>;
    deleteClass(user: Account, classId: string): Promise<{
        message: string;
    }>;
    getStudentsInClass(user: Account, classId: string, paginationDto: PaginationDto): Promise<{
        total: number;
        students: import("../student/entities/student.entity").Student[];
    }>;
}
