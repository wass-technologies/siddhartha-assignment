import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ClassEntity } from 'src/class/entities/class.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class StudentService {
    private readonly studentrepo;
    private readonly classRepo;
    private readonly schoolRepo;
    constructor(studentrepo: Repository<Student>, classRepo: Repository<ClassEntity>, schoolRepo: Repository<School>);
    addStudent(schoolId: string, classId: string, dto: CreateStudentDto, subAdmin: string): Promise<Student>;
    getAllStudents(dto: PaginationDto): Promise<{
        result: Student[];
        total: number;
    }>;
    getStudentById(studentId: string): Promise<Student>;
    updateStudent(schoolName: string, classId: string, dto: UpdateStudentDto, id: string, subAdmin: string): Promise<Student>;
    deleteStudent(studentId: string): Promise<{
        message: string;
    }>;
}
