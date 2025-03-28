"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const company_schedule_service_1 = require("./company-schedule.service");
const company_schedule_controller_1 = require("./company-schedule.controller");
const company_schedule_entity_1 = require("./entities/company-schedule.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
let CompanyScheduleModule = class CompanyScheduleModule {
};
exports.CompanyScheduleModule = CompanyScheduleModule;
exports.CompanyScheduleModule = CompanyScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_schedule_entity_1.CompanySchedule]), auth_module_1.AuthModule],
        controllers: [company_schedule_controller_1.CompanyScheduleController],
        providers: [company_schedule_service_1.CompanyScheduleService],
    })
], CompanyScheduleModule);
//# sourceMappingURL=company-schedule.module.js.map