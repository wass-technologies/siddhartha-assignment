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
const account_entity_1 = require("../account/entities/account.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const permissions_guard_1 = require("../auth/guards/permissions.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const company_details_service_1 = require("./company-details.service");
const company_detail_dto_1 = require("./dto/company-detail.dto");
const update_user_details_1 = require("../user-details/dto/update-user-details");
let SubAdminDetailsController = class SubAdminDetailsController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    getSubAdminSchools(paginationDto, user) {
        return this.schoolService.getSchools(user.id, paginationDto);
    }
    findSchool(schoolId, user) {
        return this.schoolService.findSchool(user.id, schoolId);
    }
    updateSchoolDetails(schoolId, dto, user) {
        return this.schoolService.updateSchoolDetails(user.id, schoolId, dto);
    }
    updateSchoolStatus(schoolId, status, user) {
        return this.schoolService.updateSchoolStatus(user.id, schoolId, status);
    }
    deleteSchool(schoolId, user) {
        return this.schoolService.deleteSchool(user.id, schoolId);
    }
};
exports.SubAdminDetailsController = SubAdminDetailsController;
__decorate([
    (0, common_1.Get)('schools'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SubAdminDetailsController.prototype, "getSubAdminSchools", null);
__decorate([
    (0, common_1.Get)(':schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SubAdminDetailsController.prototype, "findSchool", null);
__decorate([
    (0, common_1.Put)('update/:schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_details_1.SchoolDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SubAdminDetailsController.prototype, "updateSchoolDetails", null);
__decorate([
    (0, common_1.Put)('status/:schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SubAdminDetailsController.prototype, "updateSchoolStatus", null);
__decorate([
    (0, common_1.Delete)('delete/:schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SubAdminDetailsController.prototype, "deleteSchool", null);
exports.SubAdminDetailsController = SubAdminDetailsController = __decorate([
    (0, common_1.Controller)('sub-admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [company_details_service_1.SubAdminDetailsService])
], SubAdminDetailsController);
//# sourceMappingURL=company-details.controller.js.map