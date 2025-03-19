import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, UserRole } from 'src/enum';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
export declare class Account {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdBy: string;
    status: DefaultStatus;
    createdAt: Date;
    updatedAt: Date;
    schools: SchoolDetails[];
    userPermission: UserPermission[];
    userDetail: UserDetail[];
}
