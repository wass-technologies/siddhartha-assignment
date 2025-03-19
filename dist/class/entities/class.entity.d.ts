import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { Student } from 'src/student/entities/student.entity';
export declare class ClassEntity {
    id: string;
    className: string;
    school: SchoolDetails;
    students: Student[];
    createdAt: Date;
    updatedAt: Date;
}
