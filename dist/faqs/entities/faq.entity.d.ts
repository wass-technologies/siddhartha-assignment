import { DefaultStatus } from 'src/enum';
export declare class Faq {
    id: string;
    question: string;
    answer: string;
    status: DefaultStatus;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
}
