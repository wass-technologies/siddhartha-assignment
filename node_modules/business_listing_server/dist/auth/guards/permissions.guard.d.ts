import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../factory/casl-ability.factory';
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    private abilityFactory;
    constructor(reflector: Reflector, abilityFactory: CaslAbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private isAllowed;
}
