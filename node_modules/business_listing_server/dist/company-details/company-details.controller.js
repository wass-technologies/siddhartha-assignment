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
exports.SchoolDetailsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const account_entity_1 = require("../account/entities/account.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const company_details_service_1 = require("./company-details.service");
const company_detail_dto_1 = require("./dto/company-detail.dto");
let SchoolDetailsController = class SchoolDetailsController {
    constructor(schoolDetailsService) {
        this.schoolDetailsService = schoolDetailsService;
    }
    update(user, dto) {
        return this.schoolDetailsService.updateSchool(user.id, dto);
    }
    removeSubAdmin(schoolId) {
        return this.schoolDetailsService.removeSubAdmin(schoolId);
    }
    createSchool(user, dto) {
        return this.schoolDetailsService.createSchool(dto);
    }
    assignSubAdmin(schoolId, subAdminId) {
        return this.schoolDetailsService.assignSubAdmin(schoolId, subAdminId);
    }
    async getAllSchools(dto) {
        return this.schoolDetailsService.findSchools(dto);
    }
    status(id, dto) {
        return this.schoolDetailsService.updateStatus(id, dto);
    }
    async generateSchoolListPdf(res, user) {
        return this.schoolDetailsService.generateSchoolListPdf(res);
    }
    async getAllActiveSchools(paginationDto) {
        return this.schoolDetailsService.getSchoolsByStatus(enum_1.SchoolStatus.ACTIVE, paginationDto);
    }
    async getAllPendingSchools(paginationDto) {
        return this.schoolDetailsService.getSchoolsByStatus(enum_1.SchoolStatus.PENDING, paginationDto);
    }
    async getAllInactiveSchools(paginationDto) {
        return this.schoolDetailsService.getSchoolsByStatus(enum_1.SchoolStatus.INACTIVE, paginationDto);
    }
    async findSchool(id) {
        return await this.schoolDetailsService.findSchool(id);
    }
};
exports.SchoolDetailsController = SchoolDetailsController;
__decorate([
    (0, common_1.Patch)('update'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, company_detail_dto_1.SchoolDetailDto]),
    __metadata("design:returntype", void 0)
], SchoolDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':schoolId/remove-sub-admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'school_detail']),
    __param(0, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolDetailsController.prototype, "removeSubAdmin", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, company_detail_dto_1.SchoolDetailDto]),
    __metadata("design:returntype", void 0)
], SchoolDetailsController.prototype, "createSchool", null);
__decorate([
    (0, common_1.Post)(':schoolId/assign-sub-admin/:subAdminId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'school_detail']),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Param)('subAdminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SchoolDetailsController.prototype, "assignSubAdmin", null);
__decorate([
    (0, common_1.Get)('all-school'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "getAllSchools", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'school_detail']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_detail_dto_1.StatusDto]),
    __metadata("design:returntype", void 0)
], SchoolDetailsController.prototype, "status", null);
__decorate([
    (0, common_1.Get)('pdf'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "generateSchoolListPdf", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "getAllActiveSchools", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "getAllPendingSchools", null);
__decorate([
    (0, common_1.Get)('inactive'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "getAllInactiveSchools", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "findSchool", null);
exports.SchoolDetailsController = SchoolDetailsController = __decorate([
    (0, common_1.Controller)('school-details'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [company_details_service_1.SchoolDetailsService])
], SchoolDetailsController);
//# sourceMappingURL=company-details.controller.js.map