import { Account } from 'src/account/entities/account.entity';
export declare class UserDetail {
    id: string;
    name: string;
    email: string;
    assignedByAdminId: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    account: Account;
}
