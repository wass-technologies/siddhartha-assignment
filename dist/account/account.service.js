"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const enum_1 = require("../enum");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const account_entity_1 = require("./entities/account.entity");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const staff_detail_entity_1 = require("../staff-details/entities/staff-detail.entity");
let AccountService = class AccountService {
    constructor(repo, schoolRepo, subAdminRepo, staffRepo) {
        this.repo = repo;
        this.schoolRepo = schoolRepo;
        this.subAdminRepo = subAdminRepo;
        this.staffRepo = staffRepo;
    }
    async create(dto, createdBy) {
        const user = await this.repo.findOne({
            where: { email: dto.email, role: dto.role },
        });
        if (user) {
            throw new common_1.ConflictException('email id already exists!');
        }
        if (![enum_1.UserRole.SUB_ADMIN, enum_1.UserRole.STAFF, enum_1.UserRole.SCHOOL].includes(dto.role)) {
            throw new common_1.BadRequestException('Invalid role selection.');
        }
        const encryptedPassword = await bcrypt.hash(dto.password, 13);
        const obj = Object.assign({
            email: dto.email,
            name: dto.name,
            password: encryptedPassword,
            createdBy,
            role: dto.role,
        });
        const payload = await this.repo.save(obj);
        let entityObject = {};
        if (dto.role === enum_1.UserRole.SCHOOL) {
            entityObject = Object.assign({
                name: dto.name,
                email: dto.email,
                status: enum_1.SchoolStatus.PENDING,
                accountId: payload.id,
            });
            await this.schoolRepo.save(entityObject);
        }
        else if (dto.role === enum_1.UserRole.STAFF) {
            entityObject = Object.assign({
                name: dto.name,
                email: dto.email,
                accountId: payload.id,
            });
            await this.staffRepo.save(entityObject);
        }
        else if (dto.role === enum_1.UserRole.SUB_ADMIN) {
            entityObject = Object.assign({
                name: dto.name,
                email: dto.email,
                accountId: payload.id,
            });
            await this.subAdminRepo.save(entityObject);
        }
        return payload;
    }
    async findAllAccounts(dto) {
        const keyword = dto.keyword || '';
        const queryBuilder = this.repo.createQueryBuilder('account')
            .leftJoinAndSelect('account.subAdmins', 'subAdmins')
            .leftJoinAndSelect('account.schools', 'schools')
            .leftJoinAndSelect('account.staffDetails', 'staffDetails')
            .select([
            'account.id',
            'account.name',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'subAdmins.id',
            'subAdmins.name',
            'schools.id',
            'schools.name',
            'staffDetails.id',
            'staffDetails.name'
        ])
            .where(new typeorm_2.Brackets(qb => {
            qb.where('account.email LIKE :keyword', { keyword: `%${keyword}%` })
                .orWhere('subAdmins.name LIKE :keyword', { keyword: `%${keyword}%` })
                .orWhere('schools.name LIKE :keyword', { keyword: `%${keyword}%` })
                .orWhere('staffDetails.name LIKE :keyword', { keyword: `%${keyword}%` });
        }))
            .orderBy('account.createdAt', 'DESC')
            .skip(dto.offset)
            .take(dto.limit);
        const [result, total] = await queryBuilder.getManyAndCount();
        return { result, total };
    }
    async getSubAdminDetails(accountId) {
        const result = await this.repo.createQueryBuilder('account')
            .leftJoinAndSelect('account.subAdmins', 'subAdmins')
            .select([
            'account.id',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'subAdmins.id',
            'subAdmins.name',
        ])
            .where('account.id = :accountId', { accountId })
            .getOne();
        if (!result)
            throw new common_1.NotFoundException('Sub Admin Profile Not Found!');
        return result;
    }
    async getSchoolDetails(accountId) {
        const result = await this.repo.createQueryBuilder('account')
            .leftJoinAndSelect('account.schools', 'schools')
            .select([
            'account.id',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'schools.id',
            'schools.name',
        ])
            .where('account.id = :accountId', { accountId })
            .getOne();
        if (!result)
            throw new common_1.NotFoundException('School Profile Not Found!');
        return result;
    }
    async getStaffDetails(accountId) {
        const result = await this.repo.createQueryBuilder('account')
            .leftJoinAndSelect('account.staffDetails', 'staffDetails')
            .select([
            'account.id',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'staffDetails.id',
            'staffDetails.name',
        ])
            .where('account.id = :accountId', { accountId })
            .getOne();
        if (!result)
            throw new common_1.NotFoundException('Staff Profile Not Found!');
        return result;
    }
    async checkUserStatus(accountId) {
        const account = await this.repo.findOne({
            where: { id: accountId },
            select: ['id', 'email', 'name', 'status'],
        });
        if (!account) {
            throw new common_1.NotFoundException('User not found');
        }
        return { account };
    }
    async updateAccountStatus(accountId, status) {
        const updateResult = await this.repo.createQueryBuilder()
            .update(account_entity_1.Account)
            .set({ status })
            .where('id = :accountId', { accountId })
            .execute();
        if (!updateResult) {
            throw new common_1.NotFoundException('Account not found');
        }
        return { message: 'Account status updated successfully' };
    }
    async changePassword(accountId, dto) {
        const user = await this.repo.findOne({
            where: { id: accountId },
            select: ['id', 'password'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
        }
        if (dto.newPassword !== dto.confirmPassword) {
            throw new common_1.BadRequestException('New password and confirm password do not match');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 13);
        await this.repo.update(accountId, { password: hashedPassword });
        return { message: 'Password updated successfully' };
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(2, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SubAdmin)),
    __param(3, (0, typeorm_1.InjectRepository)(staff_detail_entity_1.StaffDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map