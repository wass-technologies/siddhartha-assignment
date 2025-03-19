import { LeedStatus } from 'src/enum';
export declare class CreateLeedDto {
    enquiryFor: string;
    location: string;
    accountId: string;
}
export declare class LeedPaginationDto {
    limit: number;
    offset: number;
    keyword: string;
    status: LeedStatus;
    fromDate: Date;
    toDate: Date;
}
export declare class PdfLeadPaginationDto {
    fromDate: Date;
    toDate: Date;
}
