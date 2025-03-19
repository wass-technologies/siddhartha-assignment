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
exports.LeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leed_entity_1 = require("./entities/leed.entity");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const call_history_entity_1 = require("../call-history/entities/call-history.entity");
const enum_1 = require("../enum");
let LeedService = class LeedService {
    constructor(repo, userDetailRepo, callHistoryRepo) {
        this.repo = repo;
        this.userDetailRepo = userDetailRepo;
        this.callHistoryRepo = callHistoryRepo;
    }
    async create(dto, companyDetailId, accountId) {
        const user = await this.userDetailRepo
            .createQueryBuilder('userDetail')
            .leftJoinAndSelect('userDetail.account', 'account')
            .where('userDetail.accountId = :accountId', { accountId: accountId })
            .getOne();
        const obj = Object.assign({
            name: user.name,
            enquiryFor: dto.enquiryFor,
            contactNumber: user.account['phoneNumber'],
            location: dto.location,
            companyDetailId,
            accountId,
        });
        const leed = await this.repo.save(obj);
        const callObj = Object.assign({
            accountId: accountId,
            companyDetailId: companyDetailId,
            role: enum_1.UserRole.MAIN_ADMIN,
        });
        this.callHistoryRepo.save(callObj);
        return leed;
    }
    async findAll(dto, companyDetailId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const query = await this.repo
            .createQueryBuilder('leed')
            .select([
            'leed.id',
            'leed.accountId',
            'leed.companyDetailId',
            'leed.name',
            'leed.enquiryFor',
            'leed.contactNumber',
            'leed.wpNo',
            'leed.location',
            'leed.status',
            'leed.createdAt',
        ])
            .where('leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate', {
            companyDetailId: companyDetailId,
            fromDate: fromDate,
            toDate: toDate,
        });
        if (dto.status && dto.status.length > 0) {
            query.andWhere('leed.status = :status', { status: dto.status });
        }
        const [result, count] = await query
            .orderBy({ 'leed.createdAt': 'DESC' })
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async findByUser(dto, accountId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const query = await this.repo
            .createQueryBuilder('leed')
            .leftJoinAndSelect('leed.companyDetail', 'companyDetail')
            .select([
            'leed.id',
            'leed.accountId',
            'leed.companyDetailId',
            'leed.name',
            'leed.enquiryFor',
            'leed.contactNumber',
            'leed.wpNo',
            'leed.location',
            'leed.status',
            'leed.createdAt',
            'companyDetail.id',
            'companyDetail.name',
            'companyDetail.businessName'
        ])
            .where('leed.accountId = :accountId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate', {
            accountId: accountId,
            fromDate: fromDate,
            toDate: toDate,
        });
        const [result, count] = await query
            .orderBy({ 'leed.createdAt': 'DESC' })
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async pdf(dto, companyDetailId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const result = await this.repo
            .createQueryBuilder('leed')
            .select([
            'leed.id',
            'leed.accountId',
            'leed.companyDetailId',
            'leed.name',
            'leed.enquiryFor',
            'leed.contactNumber',
            'leed.wpNo',
            'leed.location',
            'leed.status',
            'leed.createdAt',
        ])
            .where('leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate', {
            companyDetailId: companyDetailId,
            fromDate: fromDate,
            toDate: toDate,
        })
            .andWhere('leed.status = :status', { status: enum_1.LeedStatus.NEW })
            .orderBy({ 'leed.createdAt': 'DESC' })
            .getMany();
        return result;
    }
    async leedCount(companyDetailId) {
        const totalLeeds = await this.repo
            .createQueryBuilder('leed')
            .select(['leed.id'])
            .where('leed.companyDetailId = :companyDetailId', {
            companyDetailId: companyDetailId,
        })
            .getCount();
        const newLeeds = await this.repo
            .createQueryBuilder('leed')
            .select(['leed.id', 'leed.status'])
            .where('leed.companyDetailId = :companyDetailId AND leed.status = :status', { companyDetailId: companyDetailId, status: enum_1.LeedStatus.NEW })
            .getCount();
        return { totalLeeds: totalLeeds, newLeeds: newLeeds };
    }
    async findByAdmin(dto, companyDetailId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const query = await this.repo
            .createQueryBuilder('leed')
            .where('leed.companyDetailId = :companyDetailId AND leed.createdAt >= :fromDate AND leed.createdAt <= :toDate', {
            companyDetailId: companyDetailId,
            fromDate: fromDate,
            toDate: toDate,
        });
        if (dto.status && dto.status.length > 0) {
            query.andWhere('leed.status = :status', { status: dto.status });
        }
        const [result, count] = await query
            .orderBy({ 'leed.createdAt': 'DESC' })
            .getManyAndCount();
        return { result, count };
    }
    async status(id, companyDetailId) {
        const result = await this.repo.findOne({ where: { id, companyDetailId } });
        if (!result) {
            throw new common_1.NotFoundException('Leed Not Found!!');
        }
        const obj = Object.assign(result, { status: enum_1.LeedStatus.CALLED });
        const payload = await this.repo.save(obj);
        const callObj = Object.assign({
            accountId: result.accountId,
            companyDetailId: companyDetailId,
            role: enum_1.UserRole.MAIN_ADMIN,
        });
        this.callHistoryRepo.save(callObj);
        return payload;
    }
};
exports.LeedService = LeedService;
exports.LeedService = LeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leed_entity_1.Leed)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.UserDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(call_history_entity_1.CallHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LeedService);
//# sourceMappingURL=leed.service.js.map