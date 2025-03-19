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
exports.CompanyScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_schedule_entity_1 = require("./entities/company-schedule.entity");
const typeorm_2 = require("typeorm");
let CompanyScheduleService = class CompanyScheduleService {
    constructor(repo) {
        this.repo = repo;
    }
    async update(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Schedule not Found');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Schedule not Found');
        }
        const obj = Object.assign(result, { status: dto.status });
        return this.repo.save(obj);
    }
};
exports.CompanyScheduleService = CompanyScheduleService;
exports.CompanyScheduleService = CompanyScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_schedule_entity_1.CompanySchedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyScheduleService);
//# sourceMappingURL=company-schedule.service.js.map