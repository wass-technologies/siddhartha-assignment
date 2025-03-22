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
    async getSubAdminSchools(accountId) {
        const subAdmin = await this.subAdminRepo
            .createQueryBuilder('subAdmin')
            .leftJoinAndSelect('subAdmin.schools', 'school')
            .where('subAdmin.accountId = :accountId', { accountId })
            .getOne();
        if (!subAdmin || !subAdmin.schools.length) {
            throw new common_1.ForbiddenException('SubAdmin is not linked to any schools or unauthorized.');
        }
        return subAdmin.schools;
    }
    async getSchoolDetails(accountId, paginationDto) {
        const { limit, offset, keyword } = paginationDto;
        const query = this.schoolRepo
            .createQueryBuilder('school')
            .innerJoin('school.subAdmin', 'subAdmin')
            .where('subAdmin.accountId = :accountId', { accountId })
            .take(limit)
            .skip(offset);
        if (keyword) {
            query.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('school.name LIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('school.email LIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('school.city LIKE :keyword', { keyword: `%${keyword}%` });
            }));
        }
        const [schools, total] = await query.getManyAndCount();
        return {
            total,
            limit,
            offset,
            data: schools,
        };
    }
    async updateSchoolDetails(accountId, schoolId, dto) {
        const schools = await this.getSubAdminSchools(accountId);
        const school = schools.find(s => s.id === schoolId);
        if (!school)
            throw new common_1.NotFoundException('School not found or unauthorized');
        await this.schoolRepo.update(schoolId, dto);
        return { message: 'School details updated successfully', school };
    }
    async updateSchoolStatus(accountId, schoolId, status) {
        const schools = await this.getSubAdminSchools(accountId);
        const school = schools.find(s => s.id === schoolId);
        if (!school)
            throw new common_1.NotFoundException('School not found or unauthorized');
        await this.schoolRepo.update(schoolId, { status });
        return { message: `School status updated to ${status}`, result: { id: school.id, name: school.name, status } };
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