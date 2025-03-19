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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const create_class_dto_1 = require("./dto/create-class.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const enum_1 = require("../enum");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const account_entity_1 = require("../account/entities/account.entity");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    async addClass(subSchoolId, dto, user) {
        return await this.classService.addClass(subSchoolId, dto);
    }
    async deleteClass(subSchoolId, classId, user) {
        return this.classService.deleteClass(subSchoolId, classId);
    }
    async getAllClasses(subSchoolId, page = 1, pageSize = 10, user) {
        return this.classService.getAllClasses(subSchoolId, page, pageSize);
    }
    async getStudentsByClass(classId, user, page = 1, pageSize = 10) {
        return this.classService.getStudentsByClass(classId, user, page, pageSize);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)('add/:subschoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('subschoolId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_class_dto_1.CreateClassDto,
        account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "addClass", null);
__decorate([
    (0, common_1.Delete)(':subschoolId/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('subschoolId')),
    __param(1, (0, common_1.Param)('classId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteClass", null);
__decorate([
    (0, common_1.Get)('all/:subSchoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('subSchoolId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAllClasses", null);
__decorate([
    (0, common_1.Get)('students/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, account_entity_1.Account, Number, Number]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getStudentsByClass", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('class'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map