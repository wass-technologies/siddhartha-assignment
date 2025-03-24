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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const menus_service_1 = require("../menus/menus.service");
const permissions_service_1 = require("../permissions/permissions.service");
const user_permissions_service_1 = require("../user-permissions/user-permissions.service");
const account_service_1 = require("./account.service");
const account_entity_1 = require("./entities/account.entity");
const company_detail_dto_1 = require("../company-details/dto/company-detail.dto");
const account_dto_1 = require("./dto/account.dto");
let AccountController = class AccountController {
    constructor(accountService, menuService, permissionService, userPermService) {
        this.accountService = accountService;
        this.menuService = menuService;
        this.permissionService = permissionService;
        this.userPermService = userPermService;
    }
    async create(dto, user) {
        const account = await this.accountService.create(dto, user.id);
        if (dto.role === enum_1.UserRole.STAFF) {
            const menus = await this.menuService.findAll();
            const perms = await this.permissionService.findAll();
            const obj = [];
            menus.forEach((menu) => {
                perms.forEach((perm) => {
                    obj.push({
                        accountId: account.id,
                        menuId: menu.id,
                        permissionId: perm.id,
                    });
                });
            });
            await this.userPermService.create(obj);
        }
        return account;
    }
    async findAllSubAdmins(dto) {
        return this.accountService.findAllSubAdmins(dto);
    }
    async subAdminDetail(id) {
        return this.accountService.subAdminDetail(id);
    }
    async staffDetail(id) {
        return this.accountService.staffDetail(id);
    }
    async getAllAccounts(dto) {
        return this.accountService.getAllAccounts(dto);
    }
    async getLoggedInSubAdmin(id) {
        return this.accountService.getLoggedInSubAdmin(id);
    }
    async getLoggedInSchool(id) {
        return this.accountService.getLoggedInSchool(id);
    }
    async getStaffAccount(id) {
        return this.accountService.getStaffAccount(id);
    }
    async updateAccountStatus(id, status) {
        return this.accountService.updateAccountStatus(id, status);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.CREATE, 'account']),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDto, account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('sub-admins'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findAllSubAdmins", null);
__decorate([
    (0, common_1.Get)('sub-admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "subAdminDetail", null);
__decorate([
    (0, common_1.Get)('staff/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "staffDetail", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllAccounts", null);
__decorate([
    (0, common_1.Get)('logged-in/sub-admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getLoggedInSubAdmin", null);
__decorate([
    (0, common_1.Get)('logged-in/school/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getLoggedInSchool", null);
__decorate([
    (0, common_1.Get)('staff-account/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getStaffAccount", null);
__decorate([
    (0, common_1.Patch)('update-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAccountStatus", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        menus_service_1.MenusService,
        permissions_service_1.PermissionsService,
        user_permissions_service_1.UserPermissionsService])
], AccountController);
//# sourceMappingURL=account.controller.js.map