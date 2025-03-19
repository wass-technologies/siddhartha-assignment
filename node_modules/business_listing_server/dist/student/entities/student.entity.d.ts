import { ClassEntity } from 'src/class/entities/class.entity';
export declare class Student {
    id: string;
    studentName: string;
    age: number;
    gender: string;
    address: string;
    class: ClassEntity;
    createdAt: Date;
    updatedAt: Date;
}
