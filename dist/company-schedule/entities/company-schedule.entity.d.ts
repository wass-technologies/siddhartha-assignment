import { DayList } from 'src/enum';
export declare class CompanySchedule {
    id: string;
    name: DayList;
    time_start: Date;
    time_end: Date;
    status: boolean;
    companyDetailId: string;
    createdAt: Date;
    updatedAt: Date;
}
