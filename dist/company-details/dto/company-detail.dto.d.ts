import { SchoolStatus } from 'src/enum';
export declare class SchoolDetailDto {
    schoolName: string;
    state: string;
    city: string;
    area: string;
    address1: string;
    address2: string;
    pincode: string;
    schoolDesc: string;
}
export declare class StatusDto {
    status: SchoolStatus;
}
export declare class PaginationSDto {
    limit: number;
    offset: number;
    keyword: string;
    status: SchoolStatus;
}
export declare class PaginationDto {
    limit: number;
    offset: number;
    keyword?: string;
}
export declare class UpdateSubAdminDto {
}
