import { Socket } from 'dgram';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const WsJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class WsJwtStrategy extends WsJwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        roles: import("../../enum").UserRole[];
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../enum").UserRole;
        createdBy: string;
        status: import("../../enum").DefaultStatus;
        createdAt: Date;
        updatedAt: Date;
        schools: import("../../company-details/entities/company-detail.entity").SchoolDetails[];
        userPermission: import("../../user-permissions/entities/user-permission.entity").UserPermission[];
        userDetail: import("../../user-details/entities/user-detail.entity").UserDetail[];
    }>;
}
export declare const ExtractJwtFromWsHeader: (req: Socket) => string | null;
export {};
