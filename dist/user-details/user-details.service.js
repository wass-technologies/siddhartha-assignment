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
exports.UserDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("./entities/user-detail.entity");
let UserDetailsService = class UserDetailsService {
    constructor(repo, accountrepo) {
        this.repo = repo;
        this.accountrepo = accountrepo;
    }
    async getProfile(id) {
        const result = await this.repo
            .createQueryBuilder('userDetail')
            .leftJoinAndSelect('userDetail.account', 'account')
            .leftJoinAndSelect('account.userAddress', 'userAddress')
            .select([
            'userDetail.id',
            'userDetail.name',
            'userDetail.email',
            'userDetail.accountId',
            'account.id',
            'account.email',
            'account.roles',
            'account.status',
            'userAddress.id',
            'userAddress.name',
            'userAddress.altPhone',
            'userAddress.phone',
            'userAddress.city',
            'userAddress.state',
            'userAddress.pincode',
            'userAddress.address',
            'userAddress.status',
        ])
            .where('userDetail.accountId = :id', { id: id })
            .getOne();
        if (!result) {
            throw new common_1.NotFoundException('User not found!');
        }
        return result;
    }
    async findAll(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
            .createQueryBuilder('userDetail')
            .leftJoinAndSelect('userDetail.account', 'account')
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('account.phoneNumber LIKE :phoneNumber OR userDetail.name LIKE :name OR userDetail.gstNo LIKE :gstNo', {
                phoneNumber: '%' + keyword + '%',
                name: '%' + keyword + '%',
                gstNo: '%' + keyword + '%',
            });
        }))
            .skip(dto.offset)
            .take(dto.limit)
            .orderBy({ 'userDetail.name': 'ASC' })
            .getManyAndCount();
        return { result, total };
    }
    async findOne(id) {
        const result = await this.repo.findOne({
            where: { accountId: id },
        });
        if (!result) {
            throw new common_1.NotFoundException('User not found!');
        }
        return result;
    }
    async update(dto, accountId) {
        const result = await this.repo.findOne({ where: { accountId: accountId } });
        if (!result) {
            throw new common_1.NotFoundException('User profile not found!');
        }
        const obj = Object.assign(result, dto);
        return await this.repo.save(obj);
    }
    async updateUserStatus(userId, updateUserStatusDto) {
        const user = await this.accountrepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.status = updateUserStatusDto.status;
        await this.accountrepo.save(user);
        return { message: `User status updated to ${user.status}` };
    }
    async getUserStatus(userId) {
        const user = await this.accountrepo.findOne({
            where: { id: userId },
            select: ['id', 'status', 'name', 'role'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return { id: user.id, name: user.name, role: user.role, status: user.status };
    }
};
exports.UserDetailsService = UserDetailsService;
exports.UserDetailsService = UserDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_detail_entity_1.UserDetail)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserDetailsService);
//# sourceMappingURL=user-details.service.js.map