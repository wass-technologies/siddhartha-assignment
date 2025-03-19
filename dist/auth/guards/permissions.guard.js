"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const casl_ability_factory_1 = require("../factory/casl-ability.factory");
const enum_1 = require("../../enum");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, abilityFactory) {
        this.reflector = reflector;
        this.abilityFactory = abilityFactory;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.get(permissions_decorator_1.PERMISSION_CHECKER_KEY, context.getHandler()) || [];
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (user.role === enum_1.UserRole.MAIN_ADMIN) {
            return true;
        }
        const ability = await this.abilityFactory.createForUser(user);
        return requiredPermissions.every((permission) => this.isAllowed(ability, permission));
    }
    isAllowed(ability, permission) {
        return ability.can(...permission);
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        casl_ability_factory_1.CaslAbilityFactory])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map