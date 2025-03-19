import { LogType } from 'src/enum';
export declare class LoginHistory {
    id: number;
    ip: string;
    origin: string;
    type: LogType;
    createdAt: Date;
    accountId: string;
}
