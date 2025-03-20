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
            where: { email: dto.email },
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
                dob: dto.dob,
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
    async findAllSubAdmins(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.subAdmins', 'subAdmins')
            .select([
            'account.id',
            'account.name',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'subAdmins.id',
            'subAdmins.name',
        ])
            .where('account.role LIKE :role', { role: '%Sub_Admin%' })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('account.email LIKE :email OR subAdmins.name LIKE :name', {
                email: '%' + keyword + '%',
                name: '%' + keyword + '%',
            });
        }))
            .orderBy({ 'subAdmins.name': 'ASC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, total };
    }
    async subAdminDetail(id) {
        const result = await this.repo
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.subAdmins', 'subAdmins')
            .select([
            'account.id',
            'account.name',
            'account.email',
            'account.role',
            'account.status',
            'account.createdAt',
            'subAdmins.id',
            'subAdmins.name',
        ])
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
            .leftJoinAndSelect('account.staffDetail', 'staffDetail')
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
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(2, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SubAdmin)),
    __param(3, (0, typeorm_1.InjectRepository)(staff_detail_entity_1.StaffDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map