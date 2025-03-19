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
exports.CallHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const call_history_entity_1 = require("./entities/call-history.entity");
const typeorm_2 = require("typeorm");
const enum_1 = require("../enum");
let CallHistoryService = class CallHistoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(dto, companyDetailId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const query = await this.repo
            .createQueryBuilder('callHistory')
            .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
            .leftJoinAndSelect('callHistory.account', 'account')
            .leftJoinAndSelect('account.userDetail', 'userDetail')
            .select([
            'callHistory.id',
            'callHistory.role',
            'callHistory.createdAt',
            'companyDetail.id',
            'companyDetail.name',
            'account.id',
            'account.phoneNumber',
            'userDetail.id',
            'userDetail.name',
        ])
            .where('callHistory.companyDetailId = :companyDetailId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate', {
            companyDetailId: companyDetailId,
            role: enum_1.UserRole.STAFF,
            fromDate: fromDate,
            toDate: toDate,
        });
        const [result, count] = await query
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
            .createQueryBuilder('callHistory')
            .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
            .leftJoinAndSelect('callHistory.account', 'account')
            .leftJoinAndSelect('account.userDetail', 'userDetail')
            .select([
            'callHistory.id',
            'callHistory.role',
            'callHistory.createdAt',
            'companyDetail.id',
            'companyDetail.name',
            'companyDetail.callNumber',
            'account.id',
            'account.phoneNumber',
            'userDetail.id',
            'userDetail.name',
        ])
            .where('callHistory.accountId = :accountId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate', {
            accountId: accountId,
            role: enum_1.UserRole.STAFF,
            fromDate: fromDate,
            toDate: toDate,
        });
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async findByAdmin(dto, companyDetailId) {
        const fromDate = new Date(dto.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dto.toDate);
        toDate.setHours(23, 59, 59, 59);
        const query = await this.repo
            .createQueryBuilder('callHistory')
            .leftJoinAndSelect('callHistory.companyDetail', 'companyDetail')
            .leftJoinAndSelect('callHistory.account', 'account')
            .leftJoinAndSelect('account.userDetail', 'userDetail')
            .select([
            'callHistory.id',
            'callHistory.role',
            'callHistory.createdAt',
            'companyDetail.id',
            'companyDetail.name',
            'companyDetail.callNumber',
            'account.id',
            'account.phoneNumber',
            'userDetail.id',
            'userDetail.name',
        ])
            .where('callHistory.companyDetailId = :companyDetailId AND callHistory.role = :role AND callHistory.createdAt >= :fromDate AND callHistory.createdAt <= :toDate', {
            companyDetailId: companyDetailId,
            role: enum_1.UserRole.STAFF,
            fromDate: fromDate,
            toDate: toDate,
        });
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
};
exports.CallHistoryService = CallHistoryService;
exports.CallHistoryService = CallHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(call_history_entity_1.CallHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CallHistoryService);
//# sourceMappingURL=call-history.service.js.map