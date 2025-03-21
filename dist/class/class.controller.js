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
    async addClass(user, schoolId, dto) {
        return this.classService.addClass(user.id, schoolId, dto);
    }
    async getAllClasses(user, schoolId, dto) {
        return this.classService.getAllClasses(user.id, schoolId, dto);
    }
    async getClassById(user, classId) {
        return this.classService.getClassById(user.id, classId);
    }
    async getStudents(user, classId, dto) {
        return this.classService.getStudents(dto, classId, user);
    }
    async removeClass(user, schoolId, classId) {
        return this.classService.remove(user, schoolId, classId);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)(':schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('schoolId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, create_class_dto_1.CreateClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "addClass", null);
__decorate([
    (0, common_1.Get)(':schoolId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('schoolId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, create_class_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAllClasses", null);
__decorate([
    (0, common_1.Get)('details/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassById", null);
__decorate([
    (0, common_1.Get)('students/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('classId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, create_class_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Delete)(':schoolId/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('schoolId')),
    __param(2, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "removeClass", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('class'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map