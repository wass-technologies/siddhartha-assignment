import { CustomDecorator } from '@nestjs/common';
import { PermissionAction } from 'src/enum';
import { PermissionObjectType } from '../factory/casl-ability.factory';
export type RequiredPermission = [PermissionAction, PermissionObjectType];
export declare const PERMISSION_CHECKER_KEY = "permission_checker_params_key";
export declare const CheckPermissions: (...params: RequiredPermission[]) => CustomDecorator<string>;
