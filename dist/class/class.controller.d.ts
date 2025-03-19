import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    addClass(subSchoolId: string, dto: CreateClassDto, user: Account): Promise<import("./entities/class.entity").ClassEntity>;
    deleteClass(subSchoolId: string, classId: string, user: Account): Promise<void>;
    getAllClasses(subSchoolId: string, page: number, pageSize: number, user: Account): Promise<{
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
        students: import("../student/entities/student.entity").Student[];
        totalStudents: number;
        totalPage: number;
        currentPage: number;
        hasNextPage: boolean;
    }>;
}
