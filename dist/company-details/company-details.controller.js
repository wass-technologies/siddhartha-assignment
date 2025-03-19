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
const permissions_decorator_1 = require("../auth/decorators/permissions.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const company_details_service_1 = require("./company-details.service");
const company_detail_dto_1 = require("./dto/company-detail.dto");
let SchoolDetailsController = class SchoolDetailsController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    async createSchool(dto) {
        return this.schoolService.createSchool(dto);
    }
    async findList(dto) {
        return this.schoolService.findList(dto);
    }
    async getSchoolsByStatus(paginationDto) {
        return this.schoolService.findListByStatus(paginationDto);
    }
    async findSchool(id) {
        return this.schoolService.findSchool(id);
    }
    async update(id, dto) {
        return this.schoolService.update(id, dto);
    }
    async status(id, dto) {
        return this.schoolService.status(id, dto);
    }
    async deleteSchool(id) {
        return this.schoolService.deleteSchool(id);
    }
    async generateSchoolListPdf(res) {
        return this.schoolService.generateSchoolListPdf(res);
    }
};
exports.SchoolDetailsController = SchoolDetailsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.SchoolDetailDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "createSchool", null);
__decorate([
    (0, common_1.Get)('all-school'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.STAFF),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "findList", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationSDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "getSchoolsByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.STAFF),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "findSchool", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_detail_dto_1.SchoolDetailDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'school_detail']),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_detail_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "status", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "deleteSchool", null);
__decorate([
    (0, common_1.Get)('export/pdf'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolDetailsController.prototype, "generateSchoolListPdf", null);
exports.SchoolDetailsController = SchoolDetailsController = __decorate([
    (0, common_1.Controller)('school-details'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [company_details_service_1.SchoolDetailsService])
], SchoolDetailsController);
//# sourceMappingURL=company-details.controller.js.map