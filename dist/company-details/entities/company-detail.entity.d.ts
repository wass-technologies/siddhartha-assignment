import { Account } from 'src/account/entities/account.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
export declare class SubAdmin {
    id: string;
    name: string;
    email: string;
    account: Account;
    school: School;
}
