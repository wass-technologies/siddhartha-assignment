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
const account_entity_1 = require("../account/entities/account.entity");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("./entities/user-detail.entity");
const createSchoolTable_utils_1 = require("../utils/createSchoolTable.utils");
let SchoolService = class SchoolService {
    constructor(repo, accountrepo) {
        this.repo = repo;
        this.accountrepo = accountrepo;
    }
    async createSchool(dto) {
        const existingSchool = await this.repo.findOne({ where: { name: dto.name } });
        if (existingSchool) {
            throw new common_1.ConflictException(`School with name "${dto.name}" already exists!`);
        }
        const school = this.repo.create(dto);
        return this.repo.save(school);
    }
    async findList(dto) {
        const keyword = dto.keyword || '';
        const query = this.repo
            .createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .leftJoinAndSelect('school.companySchedule', 'companySchedule')
            .leftJoinAndSelect('school.classes', 'classes')
            .select([
            'school.id',
            'school.name',
            'school.address1',
            'school.address2',
            'school.state',
            'school.city',
            'school.area',
            'school.pincode',
            'school.status',
            'school.accountId',
            'school.createdAt',
            'school.updatedAt',
            'subAdmin.id',
            'subAdmin.name',
            'companySchedule.id',
            'classes.id',
            'classes.className'
        ]);
        query.andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('school.schoolName LIKE :schoolName', {
                schoolName: '%' + keyword + '%',
            });
        }));
        const [result, total] = await query
            .skip(dto.offset)
            .take(dto.limit)
            .orderBy({ 'school.schoolName': 'ASC' })
            .getManyAndCount();
        return { result, total };
    }
    async findListByStatus(dto) {
        const keyword = dto.keyword || '';
        const query = this.repo
            .createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .leftJoinAndSelect('school.classes', 'classes')
            .select([
            'school.id',
            'school.schoolName',
            'school.address1',
            'school.address2',
            'school.state',
            'school.city',
            'school.area',
            'school.pincode',
            'school.schoolDesc',
            'school.status',
            'school.accountId',
            'school.createdAt',
            'school.updatedAt',
            'subAdmin.id',
            'subAdmin.name',
            'classes.id',
            'classes.className',
        ])
            .where('school.status = :status', { status: dto.status });
        if (dto.keyword) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('school.name LIKE :name', {
                    name: '%' + keyword + '%',
                });
            }));
        }
        const [result, total] = await query
            .skip(dto.offset)
            .take(dto.limit)
            .orderBy({ 'school.name': 'ASC' })
            .getManyAndCount();
        return { result, total };
    }
    async findSchool(id) {
        const result = await this.repo
            .createQueryBuilder('school')
            .where('school.accountId = :accountId', { accountId: id })
            .getOne();
        if (!result) {
            throw new common_1.NotFoundException('School not found!');
        }
        return result;
    }
    async update(id, dto) {
        const result = await this.repo.findOne({ where: { accountId: id } });
        if (!result) {
            throw new common_1.NotFoundException('School not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.repo.findOne({ where: { accountId: id } });
        if (!result) {
            throw new common_1.NotFoundException('School detail not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async deleteSchool(id) {
        const result = await this.repo.findOne({ where: { accountId: id } });
        if (!result) {
            throw new common_1.NotFoundException('School not found!');
        }
        await this.repo.remove(result);
        return { message: 'School deleted successfully!' };
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
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolService);
//# sourceMappingURL=user-details.service.js.map