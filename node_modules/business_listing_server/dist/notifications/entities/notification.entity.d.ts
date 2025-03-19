import { NotificationType } from 'src/enum';
export declare class Notification {
    id: number;
    title: string;
    desc: string;
    type: NotificationType;
    read: boolean;
    createdAt: Date;
    accountId: string;
}
