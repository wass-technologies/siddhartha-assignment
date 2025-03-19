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
exports.LoginHistoryController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const account_entity_1 = require("../account/entities/account.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const pagination_dto_1 = require("./dto/pagination.dto");
const login_history_service_1 = require("./login-history.service");
let LoginHistoryController = class LoginHistoryController {
    constructor(loginHistoryService) {
        this.loginHistoryService = loginHistoryService;
    }
    findAllByUser(query, id) {
        return this.loginHistoryService.findAll(query.limit, query.offset, id);
    }
    findAll(query, user) {
        return this.loginHistoryService.findAll(query.limit, query.offset, user.id);
    }
};
exports.LoginHistoryController = LoginHistoryController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], LoginHistoryController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'login_history']),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], LoginHistoryController.prototype, "findAll", null);
exports.LoginHistoryController = LoginHistoryController = __decorate([
    (0, common_1.Controller)('login-history'),
    __metadata("design:paramtypes", [login_history_service_1.LoginHistoryService])
], LoginHistoryController);
//# sourceMappingURL=login-history.controller.js.map