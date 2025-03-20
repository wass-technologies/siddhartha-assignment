import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, UserRole } from 'src/enum';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';
import { School } from 'src/user-details/entities/user-detail.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
export declare class Account {
    id: string;
    name: string;
    email: string;
    password: string;
    createdBy: string;
    userPermission: UserPermission[];
    role: UserRole;
    status: DefaultStatus;
    staffDetails: StaffDetail[];
    schools: School[];
    subAdmins: SubAdmin[];
    createdAt: Date;
    updatedAt: Date;
}
