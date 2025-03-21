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
const class_entity_1 = require("../class/entities/class.entity");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const student_entity_1 = require("../student/entities/student.entity");
let SubAdminDetailsService = class SubAdminDetailsService {
    constructor(classRepo, schoolRepo, studentRepo) {
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
        this.studentRepo = studentRepo;
    }
    async getSchools(userId, paginationDto) {
        const { limit, offset, keyword } = paginationDto;
        const query = this.schoolRepo
            .createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('subAdmin.accountId = :userId', { userId })
            .orderBy('school.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (keyword) {
            query.andWhere('LOWER(school.name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
        }
        const [schools, total] = await query.getManyAndCount();
        return { total, schools };
    }
    async findSchool(userId, schoolId) {
        var _a;
        const school = await this.schoolRepo.findOne({
            where: { id: schoolId },
            relations: ['subAdmin'],
        });
        if (!school || ((_a = school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to access this school.');
        }
        return school;
    }
    async updateSchoolDetails(userId, schoolId, dto) {
        var _a;
        const school = await this.schoolRepo.findOne({
            where: { id: schoolId },
            relations: ['subAdmin'],
        });
        if (!school || ((_a = school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this school.');
        }
        Object.assign(school, dto);
        return this.schoolRepo.save(school);
    }
    async updateSchoolStatus(userId, schoolId, status) {
        var _a;
        const school = await this.schoolRepo.findOne({
            where: { id: schoolId },
            relations: ['subAdmin'],
        });
        if (!school || ((_a = school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this school status.');
        }
        school.status = status;
        return this.schoolRepo.save(school);
    }
    async deleteSchool(userId, schoolId) {
        var _a;
        const school = await this.schoolRepo.findOne({
            where: { id: schoolId },
            relations: ['subAdmin'],
        });
        if (!school || ((_a = school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to delete this school.');
        }
        await this.schoolRepo.remove(school);
        return { message: 'School deleted successfully' };
    }
};
exports.SubAdminDetailsService = SubAdminDetailsService;
exports.SubAdminDetailsService = SubAdminDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubAdminDetailsService);
//# sourceMappingURL=company-details.service.js.map