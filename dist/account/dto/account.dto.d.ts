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
