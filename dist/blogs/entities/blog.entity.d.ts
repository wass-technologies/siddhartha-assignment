import { DefaultStatus } from 'src/enum';
export declare class Blog {
    id: string;
    title: string;
    author: string;
    desc: string;
    date: Date;
    image: string;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date;
    status: DefaultStatus;
    accountId: string;
}
