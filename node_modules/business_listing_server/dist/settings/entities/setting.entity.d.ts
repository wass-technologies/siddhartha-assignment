import { DefaultStatus } from '../../enum';
export declare class Setting {
    id: string;
    title: string;
    user_domain: string;
    admin_domain: string;
    mobile_domain: string;
    logo: string;
    logoPath: string;
    status: DefaultStatus;
    createdAt: Date;
    updatedAt: Date;
}
