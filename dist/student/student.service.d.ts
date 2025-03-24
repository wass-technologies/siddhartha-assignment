import { CreateStudentDto, PromoteStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ClassEntity } from 'src/class/entities/class.entity';
import { UserRole } from 'src/enum';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class StudentService {
    private studentRepo;
    private classRepo;
    private schoolRepo;
    constructor(studentRepo: Repository<Student>, classRepo: Repository<ClassEntity>, schoolRepo: Repository<School>);
    verifyUserAccess(userId: string, schoolId: string, userRole: UserRole): Promise<void>;
    addStudent(userId: string, userRole: UserRole, createStudentDto: CreateStudentDto): Promise<Student>;
    getAllStudents(userId: string, schoolId: string, classId: string, userRole: UserRole, paginationDto: PaginationDto): Promise<{
        total: number;
        students: Student[];
    }>;
    updateStudent(userId: string, studentId: string, updateData: Partial<Student>, userRole: UserRole): Promise<Student>;
    deleteStudent(userId: string, studentId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    promoteStudent(userId: string, studentId: string, promoteStudentDto: PromoteStudentDto, userRole: UserRole): Promise<Student>;
}
