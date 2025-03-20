import { Student } from 'src/student/entities/student.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class ClassEntity {
    id: string;
    className: string;
    school: School;
    students: Student[];
    createdAt: Date;
    updatedAt: Date;
}
