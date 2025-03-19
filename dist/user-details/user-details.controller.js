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
exports.UserDetailsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const account_entity_1 = require("../account/entities/account.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const update_user_details_1 = require("./dto/update-user-details");
const user_details_service_1 = require("./user-details.service");
const login_dto_1 = require("../auth/dto/login.dto");
let UserDetailsController = class UserDetailsController {
    constructor(userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
    findAll(dto) {
        return this.userDetailsService.findAll(dto);
    }
    profile(user) {
        return this.userDetailsService.getProfile(user.id);
    }
    update(dto, user) {
        dto.accountId = user.id;
        return this.userDetailsService.update(dto, user.id);
    }
    async updateUserStatus(userId, updateUserStatusDto) {
        return this.userDetailsService.updateUserStatus(userId, updateUserStatusDto);
    }
    async getUserStatus(userId) {
        return this.userDetailsService.getUserStatus(userId);
    }
};
exports.UserDetailsController = UserDetailsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_details_1.PaginationSDto]),
    __metadata("design:returntype", void 0)
], UserDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], UserDetailsController.prototype, "profile", null);
__decorate([
    (0, common_1.Patch)('user/register'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_details_1.UpdateUserDetailDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], UserDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, login_dto_1.UpdateUserStatusDto]),
    __metadata("design:returntype", Promise)
], UserDetailsController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Get)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserDetailsController.prototype, "getUserStatus", null);
exports.UserDetailsController = UserDetailsController = __decorate([
    (0, common_1.Controller)('user-details'),
    __metadata("design:paramtypes", [user_details_service_1.UserDetailsService])
], UserDetailsController);
//# sourceMappingURL=user-details.controller.js.map