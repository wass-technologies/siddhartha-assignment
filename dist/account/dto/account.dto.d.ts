import { UserRole } from 'src/enum';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class CreateAccountDto {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
