import { Account } from 'src/account/entities/account.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { SchoolStatus } from 'src/enum';
export declare class School {
    id: string;
    name: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    area: string;
    pincode: string;
    status: SchoolStatus;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
    account: Account;
    subAdmins: SubAdmin[];
    classes: ClassEntity[];
}
