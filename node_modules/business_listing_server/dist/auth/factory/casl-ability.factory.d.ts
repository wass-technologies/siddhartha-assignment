import { Ability } from '@casl/ability';
import { Account } from 'src/account/entities/account.entity';
import { PermissionAction } from 'src/enum';
import { AuthService } from '../auth.service';
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
export declare class CaslAbilityFactory {
    private authService;
    constructor(authService: AuthService);
    createForUser(user: Account): Promise<AppAbility>;
}
