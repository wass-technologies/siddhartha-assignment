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
exports.SubAdminDetailsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const company_details_service_1 = require("./company-details.service");
const company_detail_dto_1 = require("./dto/company-detail.dto");
let SubAdminDetailsController = class SubAdminDetailsController {
    constructor(subAdminService) {
        this.subAdminService = subAdminService;
    }
    async getAllSubAdmins(paginationDto) {
        return this.subAdminService.getAllSubAdmins(paginationDto);
    }
    async getSubAdminById(id) {
        return this.subAdminService.getSubAdminById(id);
    }
    async updateSubAdmin(id, updateSubAdminDto) {
        return this.subAdminService.updateSubAdmin(id, updateSubAdminDto);
    }
    async deleteSubAdmin(id) {
        return this.subAdminService.deleteSubAdmin(id);
    }
    async verifySubAdminAssociation(subAdminId, schoolId) {
        return this.subAdminService.verifySubAdminAssociation(subAdminId, schoolId);
    }
};
exports.SubAdminDetailsController = SubAdminDetailsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SubAdminDetailsController.prototype, "getAllSubAdmins", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubAdminDetailsController.prototype, "getSubAdminById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_detail_dto_1.UpdateSubAdminDto]),
    __metadata("design:returntype", Promise)
], SubAdminDetailsController.prototype, "updateSubAdmin", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubAdminDetailsController.prototype, "deleteSubAdmin", null);
__decorate([
    (0, common_1.Get)(':subAdminId/verify/:schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('subAdminId')),
    __param(1, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubAdminDetailsController.prototype, "verifySubAdminAssociation", null);
exports.SubAdminDetailsController = SubAdminDetailsController = __decorate([
    (0, common_1.Controller)('sub-admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [company_details_service_1.SubAdminDetailsService])
], SubAdminDetailsController);
//# sourceMappingURL=company-details.controller.js.map