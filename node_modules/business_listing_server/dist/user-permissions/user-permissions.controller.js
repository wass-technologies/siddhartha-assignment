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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const permission_dto_1 = require("./dto/permission.dto");
const user_permissions_service_1 = require("./user-permissions.service");
let UserPermissionsController = class UserPermissionsController {
    constructor(userPermissionsService) {
        this.userPermissionsService = userPermissionsService;
    }
    async update(id, dto) {
        const obj = [];
        dto.menu.forEach((menuItem) => {
            menuItem.userPermission.forEach((permItem) => {
                obj.push({
                    id: permItem.id,
                    rootAccountId: permItem.accountId,
                    menuId: menuItem.id,
                    permissionId: permItem.permission.id,
                    status: permItem.status,
                });
            });
        });
        this.userPermissionsService.create(obj);
        return { menu: dto.menu };
    }
};
exports.UserPermissionsController = UserPermissionsController;
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'user_permission']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], UserPermissionsController.prototype, "update", null);
exports.UserPermissionsController = UserPermissionsController = __decorate([
    (0, common_1.Controller)('user-permissions'),
    __metadata("design:paramtypes", [user_permissions_service_1.UserPermissionsService])
], UserPermissionsController);
//# sourceMappingURL=user-permissions.controller.js.map