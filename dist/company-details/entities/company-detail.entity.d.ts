import { Account } from 'src/account/entities/account.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { SchoolStatus } from 'src/enum';
import { Leed } from 'src/leed/entities/leed.entity';
export declare class SchoolDetails {
    id: string;
    profileId: number;
    schoolName: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    area: string;
    pincode: string;
    schoolDesc: string;
    status: SchoolStatus;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
    subAdmin: Account;
    companySchedule: CompanySchedule[];
    leed: Leed[];
    classes: ClassEntity[];
}
