import { Socket } from 'dgram';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const WsJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class WsJwtStrategy extends WsJwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<any>;
}
export declare const ExtractJwtFromWsHeader: (req: Socket) => string | null;
export {};
