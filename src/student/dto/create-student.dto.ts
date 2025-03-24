import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    schoolId:string;

    @IsNotEmpty()
    classId:string;

    @IsString()
    @IsNotEmpty()
    studentName:string;
    
    @IsInt()
    @Min(3)
    @Max(20)
    age:number;

    @IsString()
    @IsNotEmpty()
    gender:string

}

export class PromoteStudentDto{
    classId:string;

}
