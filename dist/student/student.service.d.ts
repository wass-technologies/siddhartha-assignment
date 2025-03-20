import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { PaginationDto } from 'src/company-details/dto/company-detail.dto';
export declare class StudentService {
    private readonly studentrepo;
    private readonly classRepo;
    private readonly schoolRepo;
    constructor(studentrepo: Repository<Student>, classRepo: Repository<ClassEntity>, schoolRepo: Repository<SchoolDetails>);
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
