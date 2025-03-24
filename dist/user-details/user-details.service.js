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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("./entities/user-detail.entity");
const createSchoolTable_utils_1 = require("../utils/createSchoolTable.utils");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const enum_1 = require("../enum");
let SchoolService = class SchoolService {
    constructor(schoolRepo, subAdminRepo) {
        this.schoolRepo = schoolRepo;
        this.subAdminRepo = subAdminRepo;
    }
    async getSubAdminIdByAccountId(accountId) {
        const subAdmin = await this.subAdminRepo.createQueryBuilder('subAdmin')
            .where('subAdmin.accountId = :accountId', { accountId })
            .getOne();
        if (!subAdmin)
            throw new common_1.NotFoundException('SubAdmin not found');
        return subAdmin.id;
    }
    async verifySubAdminOwnership(accountId, schoolId) {
        const subAdminId = await this.getSubAdminIdByAccountId(accountId);
        const school = await this.schoolRepo.createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('school.id = :id', { id: schoolId })
            .getOne();
        if (!school)
            throw new common_1.NotFoundException('School not found');
        if (school.subAdmin.id !== subAdminId)
            throw new common_1.ForbiddenException('Unauthorized access');
    }
    async assignSubAdmin(schoolId, subAdminId, replaceExisting) {
        const school = await this.schoolRepo.findOne({
            where: { id: schoolId },
            relations: ['subAdmin']
        });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        if (school.subAdmin && !replaceExisting) {
            throw new common_1.ConflictException('School already has a SubAdmin. Set replaceExisting to true to replace.');
        }
        const subAdmin = await this.subAdminRepo.findOne({ where: { id: subAdminId } });
        if (!subAdmin) {
            throw new common_1.NotFoundException('SubAdmin not found');
        }
        school.subAdmin = subAdmin;
        await this.schoolRepo.save(school);
        return { message: 'SubAdmin assigned successfully', school };
    }
    async getAllSchools(paginationDto) {
        const queryBuilder = this.schoolRepo.createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .skip(paginationDto.offset)
            .take(paginationDto.limit);
        const [result, total] = await queryBuilder.getManyAndCount();
        return { result, total };
    }
    async getSchoolByAccountId(accountId) {
        const school = await this.schoolRepo.createQueryBuilder('school')
            .where('school.accountId = :accountId', { accountId })
            .getOne();
        if (!school)
            throw new common_1.NotFoundException('School not found');
        return school;
    }
    async getSchoolsForSubAdmin(accountId, paginationDto) {
        const subAdminId = await this.getSubAdminIdByAccountId(accountId);
        const queryBuilder = this.schoolRepo.createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('subAdmin.id = :subAdminId', { subAdminId })
            .skip(paginationDto.offset)
            .take(paginationDto.limit);
        const [result, total] = await queryBuilder.getManyAndCount();
        return { result, total };
    }
    async getSchoolById(accountId, schoolId, role) {
        const school = await this.schoolRepo.createQueryBuilder('school')
            .where('school.id = :id', { id: schoolId })
            .getOne();
        if (!school)
            throw new common_1.NotFoundException('School not found');
        if (role === enum_1.UserRole.SUB_ADMIN)
            await this.verifySubAdminOwnership(accountId, schoolId);
        if (role === enum_1.UserRole.SCHOOL && school.accountId !== accountId)
            throw new common_1.ForbiddenException('Unauthorized access');
        return school;
    }
    async updateSchool(accountId, schoolId, updateSchoolDto, role) {
        await this.getSchoolById(accountId, schoolId, role);
        await this.schoolRepo.createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set(updateSchoolDto)
            .where('id = :id', { id: schoolId })
            .execute();
        return this.getSchoolById(accountId, schoolId, role);
    }
    async updateSchoolStatus(accountId, schoolId, newStatus, role) {
        if (role === enum_1.UserRole.SUB_ADMIN)
            await this.verifySubAdminOwnership(accountId, schoolId);
        await this.schoolRepo.createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set({ status: newStatus })
            .where('id = :id', { id: schoolId })
            .execute();
        return this.getSchoolById(accountId, schoolId, role);
    }
    async updateSchoolByAccountId(accountId, updateSchoolDto) {
        await this.getSchoolByAccountId(accountId);
        await this.schoolRepo.createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set(updateSchoolDto)
            .where('accountId = :accountId', { accountId })
            .execute();
        return this.getSchoolByAccountId(accountId);
    }
    async deleteSchool(accountId, schoolId) {
        await this.getSchoolById(accountId, schoolId, enum_1.UserRole.MAIN_ADMIN);
        await this.schoolRepo.createQueryBuilder()
            .delete()
            .from(user_detail_entity_1.School)
            .where('id = :id', { id: schoolId })
            .execute();
    }
    async generateSchoolListPdf(res) {
        const schools = await this.schoolRepo.find();
        if (schools.length === 0) {
            throw new common_1.NotFoundException('No schools found');
        }
        const doc = await (0, createSchoolTable_utils_1.createSchoolTable)(schools);
        res.setHeader('Content-Disposition', 'attachment; filename="schools_list.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.end();
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SubAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolService);
//# sourceMappingURL=user-details.service.js.map