import { UserRole } from 'src/enum';
export declare class CreateMainAdminDto {
    email: string;
    password: string;
    name: string;
}
export declare class CreateSubAdminDto {
    email: string;
    password: string;
    name: string;
    schoolId: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class CreateAccountDto {
    password: string;
    name: string;
    email: string;
    dob: string;
    role: UserRole;
}
