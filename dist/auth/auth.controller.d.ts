import { AuthService } from './auth.service';
import { signIn } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    mainAdminLogin(dto: signIn): Promise<{
        token: string;
    }>;
    subAdminLogin(dto: signIn): Promise<{
        token: string;
    }>;
    staffLogin(dto: signIn): Promise<{
        token: string;
    }>;
    schoolLogin(dto: signIn): Promise<{
        token: string;
    }>;
}
