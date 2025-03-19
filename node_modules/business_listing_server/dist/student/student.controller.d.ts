import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Account } from 'src/account/entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(subSchoolId: string, classId: string, dto: CreateStudentDto, user: Account): Promise<import("./entities/student.entity").Student>;
    getAllStudent(dto: PaginationDto): Promise<{
        result: import("./entities/student.entity").Student[];
        total: number;
    }>;
    deleteStudent(studentId: string): Promise<{
        message: string;
    }>;
    getStudentById(studentId: string): Promise<import("./entities/student.entity").Student>;
}
