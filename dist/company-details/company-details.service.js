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
    async getAllSubAdmins(paginationDto) {
        const { offset, limit, keyword } = paginationDto;
        const queryBuilder = this.subAdminRepo.createQueryBuilder('subAdmin')
            .leftJoinAndSelect('subAdmin.schools', 'school')
            .where(new typeorm_2.Brackets((qb) => {
            if (keyword) {
                qb.where('subAdmin.name LIKE :keyword', { keyword: `%${keyword}%` })
                    .orWhere('subAdmin.email LIKE :keyword', { keyword: `%${keyword}%` });
            }
        }))
            .skip(offset)
            .take(limit);
        return await queryBuilder.getMany();
    }
    async getSubAdminById(id) {
        const subAdmin = await this.subAdminRepo.createQueryBuilder('subAdmin')
            .leftJoinAndSelect('subAdmin.schools', 'school')
            .where('subAdmin.id = :id', { id })
            .getOne();
        if (!subAdmin) {
            throw new common_1.NotFoundException('SubAdmin not found');
        }
        return subAdmin;
    }
    async updateSubAdmin(id, updateSubAdminDto) {
        await this.subAdminRepo.update(id, updateSubAdminDto);
        return this.getSubAdminById(id);
    }
    async deleteSubAdmin(id) {
        const result = await this.subAdminRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('SubAdmin not found');
        }
    }
    async verifySubAdminAssociation(subAdminId, schoolId) {
        const school = await this.schoolRepo.createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('school.id = :schoolId', { schoolId })
            .getOne();
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        if (school.subAdmin.id !== subAdminId) {
            throw new common_1.ForbiddenException('SubAdmin is not associated with this school');
        }
        return true;
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