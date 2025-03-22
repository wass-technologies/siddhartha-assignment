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
    getSchoolDetails(user) {
        return this.schoolService.getSchoolDetails(user.id);
    }
    getTotalClasses(paginationDto, user) {
        return this.schoolService.getTotalClasses(user.id, paginationDto);
    }
    getClassWiseStudentList(body, user) {
        return this.schoolService.getClassWiseStudentList(user.id, body.classId, body.paginationDto);
    }
    getStudentById(studentId, user) {
        return this.schoolService.getStudentById(user.id, studentId);
    }
    async generateSchoolListPdf(res) {
        return this.schoolService.generateSchoolListPdf(res);
    }
    async assignSubAdmin(dto) {
        return this.schoolService.assignSubAdmin(dto);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Get)('details'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "getSchoolDetails", null);
__decorate([
    (0, common_1.Get)('classes'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_details_1.PaginationDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "getTotalClasses", null);
__decorate([
    (0, common_1.Get)('class/students'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "getClassWiseStudentList", null);
__decorate([
    (0, common_1.Get)('student/:id'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SCHOOL),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Get)('generate/pdf'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN, enum_1.UserRole.STAFF),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.READ, 'school_detail']),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "generateSchoolListPdf", null);
__decorate([
    (0, common_1.Patch)(':schoolId/assign-subadmin/:subAdminId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, permissions_decorator_1.CheckPermissions)([enum_1.PermissionAction.UPDATE, 'school_detail']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_details_1.AssignSubAdminDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "assignSubAdmin", null);
exports.SchoolController = SchoolController = __decorate([
    (0, common_1.Controller)('school'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [user_details_service_1.SchoolService])
], SchoolController);
//# sourceMappingURL=user-details.controller.js.map