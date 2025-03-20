import { SchoolStatus } from 'src/enum';
export declare class SchoolDto {
    name: string;
    email: string;
    state: string;
    city: string;
    area: string;
    address1: string;
    address2: string;
    pincode: string;
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
    keyword: string;
}
