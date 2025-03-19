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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const enum_1 = require("../enum");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const account_entity_1 = require("../account/entities/account.entity");
const company_detail_dto_1 = require("../company-details/dto/company-detail.dto");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async addStudent(subSchoolId, classId, dto, user) {
        const subAdmin = user.id;
        return this.studentService.addStudent(subSchoolId, classId, dto, subAdmin);
    }
    async getAllStudent(dto) {
        return this.studentService.getAllStudents(dto);
    }
    async deleteStudent(studentId) {
        return this.studentService.deleteStudent(studentId);
    }
    async getStudentById(studentId) {
        return this.studentService.getStudentById(studentId);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)(':subSchoolId/:classId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('subSchoolId')),
    __param(1, (0, common_1.Param)('classId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_student_dto_1.CreateStudentDto,
        account_entity_1.Account]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('all-student'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_detail_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAllStudent", null);
__decorate([
    (0, common_1.Delete)(':studentId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Get)(':studentId'),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentById", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map