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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./entities/account.entity");
let AccountService = class AccountService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAllSubAdmins(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.schools', 'schools')
            .select([
            'account.id',
            'account.name',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'schools.id',
            'schools.schoolName',
        ])
            .where('account.role LIKE :role', { role: '%Sub_Admin%' })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('account.email LIKE :email OR schools.schoolName LIKE :name', {
                email: '%' + keyword + '%',
                name: '%' + keyword + '%',
            });
        }))
            .orderBy({ 'schools.schoolName': 'ASC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, total };
    }
    async subAdminDetail(id) {
        const result = await this.repo
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.schools', 'schools')
            .where('account.id = :id', { id })
            .andWhere('account.roles LIKE :role', { role: '%Sub_Admin%' })
            .getOne();
        if (!result) {
            throw new common_1.NotFoundException('Sub Admin Profile Not Found!');
        }
        return result;
    }
    async staffDetail(id) {
        const result = await this.repo
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.companyDetail', 'companyDetail')
            .where('account.id = :id', { id })
            .andWhere('account.roles LIKE :role', { role: '%Staff%' })
            .getOne();
        if (!result) {
            throw new common_1.NotFoundException('Staff Profile Not Found!');
        }
        return result;
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map