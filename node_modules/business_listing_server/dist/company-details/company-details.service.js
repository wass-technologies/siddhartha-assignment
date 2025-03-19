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
exports.SchoolDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_detail_entity_1 = require("./entities/company-detail.entity");
const account_entity_1 = require("../account/entities/account.entity");
const enum_1 = require("../enum");
const createSchoolTable_utils_1 = require("../utils/createSchoolTable.utils");
let SchoolDetailsService = class SchoolDetailsService {
    constructor(repo, accountRepo) {
        this.repo = repo;
        this.accountRepo = accountRepo;
    }
    async createSchool(dto) {
        const existingSchool = await this.repo.findOne({ where: { schoolName: dto.schoolName } });
        if (existingSchool) {
            throw new common_1.ConflictException(`School with name "${dto.schoolName}" already exists!`);
        }
        const school = this.repo.create(dto);
        return this.repo.save(school);
    }
    async updateSchool(schoolId, dto) {
        const school = await this.repo.findOne({ where: { id: schoolId } });
        if (!school) {
            throw new common_1.NotFoundException('School not found!');
        }
        Object.assign(school, dto);
        return this.repo.save(school);
    }
    async assignSubAdmin(schoolId, subAdminId) {
        const school = await this.repo.findOne({ where: { id: schoolId }, relations: ['subAdmin'] });
        if (!school) {
            throw new common_1.NotFoundException('School not found!');
        }
        const subAdmin = await this.accountRepo.findOne({ where: { id: subAdminId, role: enum_1.UserRole.SUB_ADMIN } });
        if (!subAdmin) {
            throw new common_1.NotFoundException('Sub Admin not found!');
        }
        if (school.subAdmin) {
            school.subAdmin = null;
            await this.repo.save(school);
        }
        school.subAdmin = subAdmin;
        return this.repo.save(school);
    }
    async removeSubAdmin(schoolId) {
        const school = await this.repo.findOne({ where: { id: schoolId }, relations: ['subAdmin'] });
        if (!school) {
            throw new common_1.NotFoundException('School not found!');
        }
        school.subAdmin = null;
        return this.repo.save(school);
    }
    async findSchools(dto) {
        const keyword = dto.keyword || '';
        const query = this.repo
            .createQueryBuilder('school')
            .where('school.schoolName LIKE :schoolName', { schoolName: `%${keyword}%` });
        const [result, total] = await query.skip(dto.offset).take(dto.limit).orderBy({ 'school.schoolName': 'ASC' }).getManyAndCount();
        return { result, total };
    }
    async getSchoolsByStatus(status, paginationDto) {
        const { limit, offset, keyword } = paginationDto;
        const whereCondition = keyword
            ? { status, schoolName: (0, typeorm_2.Like)(`%${keyword}%`) }
            : { status };
        const [schools, total] = await this.repo.findAndCount({
            where: whereCondition,
            skip: offset,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            data: schools,
            totalSchools: total,
            limit,
            offset,
        };
    }
    async findSchool(id) {
        const result = await this.repo
            .createQueryBuilder('schoolDetail')
            .where('schoolDetail.id = :Id', { Id: id })
            .getOne();
        if (!result) {
            throw new common_1.NotFoundException('School not found!');
        }
        return result;
    }
    async updateStatus(schoolId, dto) {
        const school = await this.repo.findOne({ where: { id: schoolId } });
        if (!school) {
            throw new common_1.NotFoundException('School not found!');
        }
        const obj = Object.assign(school, dto);
        return this.repo.save(obj);
    }
    async generateSchoolListPdf(res) {
        const schools = await this.repo.find();
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
exports.SchoolDetailsService = SchoolDetailsService;
exports.SchoolDetailsService = SchoolDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SchoolDetails)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolDetailsService);
//# sourceMappingURL=company-details.service.js.map