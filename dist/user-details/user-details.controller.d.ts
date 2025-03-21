import { PaginationDto } from './dto/update-user-details';
import { SchoolService } from './user-details.service';
import { Response } from 'express';
import { Account } from 'src/account/entities/account.entity';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    getSchoolDetails(user: Account): Promise<import("./entities/user-detail.entity").School>;
    getTotalClasses(paginationDto: PaginationDto, user: Account): Promise<{
        result: import("../class/entities/class.entity").ClassEntity[];
        total: number;
    }>;
    getClassWiseStudentList(body: {
        classId: string;
        paginationDto: PaginationDto;
    }, user: Account): Promise<{
        totalStudents: number;
        students: import("../class/entities/class.entity").ClassEntity[];
    }>;
    getStudentById(studentId: string, user: Account): Promise<import("../student/entities/student.entity").Student>;
    generateSchoolListPdf(res: Response): Promise<void>;
    assignSubAdmin(schoolId: string, subAdminId: string): Promise<import("./entities/user-detail.entity").School>;
}
