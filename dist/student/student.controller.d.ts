import { StudentService } from './student.service';
import { CreateStudentDto, PromoteStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Account } from 'src/account/entities/account.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(user: Account, createStudentDto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
    getAllStudents(user: Account, schoolId: string, classId: string, paginationDto: PaginationDto): Promise<{
        total: number;
        students: import("./entities/student.entity").Student[];
    }>;
    updateStudent(user: Account, studentId: string, updateStudentDto: UpdateStudentDto): Promise<import("./entities/student.entity").Student>;
    deleteStudent(user: Account, studentId: string): Promise<{
        message: string;
    }>;
    promoteStudent(user: Account, studentId: string, promoteStudentDto: PromoteStudentDto): Promise<import("./entities/student.entity").Student>;
}
