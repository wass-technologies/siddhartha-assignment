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
exports.SubAdminDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const company_detail_entity_1 = require("./entities/company-detail.entity");
let SubAdminDetailsService = class SubAdminDetailsService {
    constructor(subAdminRepo, schoolRepo) {
        this.subAdminRepo = subAdminRepo;
        this.schoolRepo = schoolRepo;
    }
    async getSubAdminSchool(accountId) {
        const subAdmin = await this.subAdminRepo
            .createQueryBuilder('subAdmin')
            .leftJoinAndSelect('subAdmin.school', 'school')
            .where('subAdmin.accountId = :accountId', { accountId })
            .getOne();
        if (!subAdmin || !subAdmin.school) {
            throw new common_1.ForbiddenException('SubAdmin is not linked to any school or unauthorized.');
        }
        return subAdmin.school;
    }
    async getSchoolDetails(accountId) {
        return this.getSubAdminSchool(accountId);
    }
    async updateSchoolDetails(accountId, dto) {
        const school = await this.getSubAdminSchool(accountId);
        await this.schoolRepo
            .createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set(dto)
            .where('id = :schoolId', { schoolId: school.id })
            .execute();
        return { message: 'School details updated successfully', school };
    }
    async updateSchoolStatus(accountId, status) {
        const school = await this.getSubAdminSchool(accountId);
        await this.schoolRepo
            .createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set({ status })
            .where('id = :schoolId', { schoolId: school.id })
            .execute();
        const result = { id: school.id, name: school.name, status: school.status };
        return { message: `School status updated to ${status}`, result };
    }
};
exports.SubAdminDetailsService = SubAdminDetailsService;
exports.SubAdminDetailsService = SubAdminDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SubAdmin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubAdminDetailsService);
//# sourceMappingURL=company-details.service.js.map