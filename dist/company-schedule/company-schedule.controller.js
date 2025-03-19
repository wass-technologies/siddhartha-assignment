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
exports.CompanyScheduleController = void 0;
const common_1 = require("@nestjs/common");
const company_schedule_service_1 = require("./company-schedule.service");
const update_company_schedule_dto_1 = require("./dto/update-company-schedule.dto");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const enum_1 = require("../enum");
const bool_status_dto_1 = require("../common/dto/bool-status.dto");
let CompanyScheduleController = class CompanyScheduleController {
    constructor(companyScheduleService) {
        this.companyScheduleService = companyScheduleService;
    }
    update(id, dto) {
        return this.companyScheduleService.update(id, dto);
    }
    status(id, dto) {
        return this.companyScheduleService.status(id, dto);
    }
};
exports.CompanyScheduleController = CompanyScheduleController;
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_schedule_dto_1.UpdateCompanyScheduleDto]),
    __metadata("design:returntype", void 0)
], CompanyScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bool_status_dto_1.BoolStatusDto]),
    __metadata("design:returntype", void 0)
], CompanyScheduleController.prototype, "status", null);
exports.CompanyScheduleController = CompanyScheduleController = __decorate([
    (0, common_1.Controller)('company-schedule'),
    __metadata("design:paramtypes", [company_schedule_service_1.CompanyScheduleService])
], CompanyScheduleController);
//# sourceMappingURL=company-schedule.controller.js.map