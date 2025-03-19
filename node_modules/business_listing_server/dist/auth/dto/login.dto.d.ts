import { DefaultStatus } from 'src/enum';
export declare class signIn {
    email: string;
    password: string;
}
export declare class WebLoginDto {
    loginId: string;
}
export declare class OtpDto {
    loginId: string;
    otp: number;
}
export declare class SigninDto {
    loginId: string;
}
export declare class AdminSigninDto {
    loginId: string;
    password: string;
}
export declare class StaffLoinDto {
    loginId: string;
    password: string;
}
export declare class CreateDetailDto {
    name: string;
    profileId: number;
    wpNo: string;
    profile: string;
    accountId: string;
}
export declare class UpdateUserStatusDto {
    status: DefaultStatus;
}
