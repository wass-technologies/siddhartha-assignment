import { LeedStatus } from 'src/enum';
export declare class Leed {
    id: string;
    accountId: string;
    companyDetailId: string;
    name: string;
    enquiryFor: string;
    contactNumber: string;
    wpNo: string;
    location: string;
    status: LeedStatus;
    createdAt: Date;
    updatedAt: Date;
}
