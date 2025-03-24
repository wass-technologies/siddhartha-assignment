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
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const update_user_details_1 = require("./dto/update-user-details");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const user_details_service_1 = require("./user-details.service");
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const account_entity_1 = require("../account/entities/account.entity");
let SchoolController = class SchoolController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    async assignSubAdmin(schoolId, subAdminId, replaceExisting) {
        return this.schoolService.assignSubAdmin(schoolId, subAdminId, replaceExisting);
    }
    async getAllSchools(paginationDto) {
        return this.schoolService.getAllSchools(paginationDto);
    }
    async getSchoolsForSubAdmin(user, paginationDto) {
        return this.schoolService.getSchoolsForSubAdmin(user.id, paginationDto);
    }
    async getSchoolById(user, schoolId) {
        return this.schoolService.getSchoolById(user.id, schoolId, user.role);
    }
    async updateSchool(user, schoolId, updateSchoolDto) {
        return this.schoolService.updateSchool(user.id, schoolId, updateSchoolDto, user.role);
    }
    async updateSchoolStatus(user, schoolId, newStatus) {
        return this.schoolService.updateSchoolStatus(user.id, schoolId, newStatus, user.role);
    }
    async deleteSchool(user, schoolId) {
        return this.schoolService.deleteSchool(user.id, schoolId);
    }
    async getSchoolByAccount(user) {
        return this.schoolService.getSchoolByAccountId(user.id);
    }
    async updateSchoolByAccount(user, updateSchoolDto) {
        return this.schoolService.updateSchoolByAccountId(user.id, updateSchoolDto);
    }
    async generateSchoolListPdf(res) {
        return this.schoolService.generateSchoolListPdf(res);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Post)(':id/assign-subadmin'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('subAdminId')),
    __param(2, (0, common_1.Body)('replaceExisting')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "assignSubAdmin", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_details_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "getAllSchools", null);
__decorate([
    (0, common_1.Get)('subadmin/list'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account,
        update_user_details_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "getSchoolsForSubAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.SCHOOL),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "getSchoolById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.SCHOOL),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, update_user_details_1.SchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "updateSchool", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "updateSchoolStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "deleteSchool", null);
__decorate([
    (0, common_1.Get)('account/me'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "getSchoolByAccount", null);
__decorate([
    (0, common_1.Patch)('account/me'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, update_user_details_1.SchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "updateSchoolByAccount", null);
__decorate([
    (0, common_1.Get)('generate/pdf'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "generateSchoolListPdf", null);
exports.SchoolController = SchoolController = __decorate([
    (0, common_1.Controller)('school'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [user_details_service_1.SchoolService])
], SchoolController);
//# sourceMappingURL=user-details.controller.js.map