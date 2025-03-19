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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const account_entity_1 = require("../account/entities/account.entity");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const enum_1 = require("../enum");
const login_history_entity_1 = require("../login-history/entities/login-history.entity");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const user_permission_entity_1 = require("../user-permissions/entities/user-permission.entity");
const apiFeatures_utils_1 = __importDefault(require("../utils/apiFeatures.utils"));
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(jwtService, accountRepo, logRepo, upRepo, companyDetailRepo, userpermissionRepo, userDetailRepo, cacheManager) {
        this.jwtService = jwtService;
        this.accountRepo = accountRepo;
        this.logRepo = logRepo;
        this.upRepo = upRepo;
        this.companyDetailRepo = companyDetailRepo;
        this.userpermissionRepo = userpermissionRepo;
        this.userDetailRepo = userDetailRepo;
        this.cacheManager = cacheManager;
        this.getPermissions = async (accountId) => {
            let result = await this.cacheManager.get('userPermission' + accountId);
            if (!result) {
                result = await this.upRepo.find({
                    relations: ['permission', 'menu'],
                    where: { accountId, status: true },
                });
                this.cacheManager.set('userPermission' + accountId, result, 7 * 24 * 60 * 60 * 1000);
            }
            return result;
        };
        this.getUserDetails = async (loginId, role) => {
            const query = this.accountRepo
                .createQueryBuilder('account')
                .leftJoinAndSelect('account.schools', 'schools')
                .leftJoinAndSelect('account.userDetail', 'userDetail')
                .select([
                'account.id',
                'account.email',
                'account.password',
                'account.role',
                'account.status',
                'schools.id',
                'schools.schoolName',
                'schools.status',
                'userDetail.id',
                'userDetail.name',
            ]);
            if (role) {
                query.andWhere('account.role = :role', { role });
            }
            const result = await query
                .andWhere('account.email = :loginId', { loginId })
                .getOne();
            if (!result) {
                throw new common_1.UnauthorizedException('Account not found!');
            }
            return result;
        };
    }
    async mainAdmindminsignIn(dto) {
        const user = await this.getUserDetails(dto.email, enum_1.UserRole.MAIN_ADMIN);
        if (!user) {
            throw new common_1.UnauthorizedException('Account not found or incorrect role!');
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password);
        if (!comparePassword) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
        };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async staffSignIn(dto) {
        const user = await this.getUserDetails(dto.email, enum_1.UserRole.STAFF);
        if (!user) {
            throw new common_1.UnauthorizedException('Account not found or incorrect role!');
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password);
        if (!comparePassword) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const permissions = await this.getPermissions(user.id);
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status
        };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async subAdminsignIn(dto) {
        const user = await this.getUserDetails(dto.email, enum_1.UserRole.SUB_ADMIN);
        if (!user) {
            throw new common_1.UnauthorizedException('Account not found or incorrect role!');
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password);
        if (!comparePassword) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const token = await apiFeatures_utils_1.default.assignJwtToken(user.id, this.jwtService);
        return { token };
    }
    async validate(id, role) {
        const user = await this.getUserDetails(id, role);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found!');
        }
        return Object.assign(Object.assign({}, user), { roles: [user.role] });
    }
    findPermission(accountId) {
        return this.getPermissions(accountId);
    }
    async createUser(createUserDto, role, createdBy) {
        if (!createUserDto.password) {
            throw new common_1.BadRequestException('Password is required');
        }
        const existingAccount = await this.accountRepo.findOne({
            where: { email: createUserDto.email },
        });
        if (existingAccount) {
            throw new common_1.ForbiddenException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const account = await this.accountRepo.save({
            email: createUserDto.email,
            name: createUserDto.name,
            password: hashedPassword,
            role,
            createdBy,
            status: enum_1.DefaultStatus.ACTIVE,
        });
        const userDetail = await this.userDetailRepo.save({
            email: createUserDto.email,
            name: createUserDto.name,
            accountId: account.id,
            assignedByAdminId: createdBy,
            status: enum_1.DefaultStatus.ACTIVE,
        });
        return { account, userDetail };
    }
    async createMainAdmin(dto) {
        const existingAdmin = await this.accountRepo.findOne({
            where: { role: enum_1.UserRole.MAIN_ADMIN },
        });
        if (existingAdmin) {
            throw new common_1.ForbiddenException('Main admin already exists');
        }
        return this.createUser(dto, enum_1.UserRole.MAIN_ADMIN);
    }
    async createSubAdmin(dto, createdBy) {
        const school = await this.companyDetailRepo.findOne({ where: { id: dto.schoolId } });
        if (!school) {
            throw new common_1.NotFoundException('School not found!');
        }
        if (school.subAdmin) {
            await this.accountRepo.delete(school.subAdmin.id);
        }
        const { account } = await this.createUser(dto, enum_1.UserRole.SUB_ADMIN, createdBy);
        school.subAdmin = account;
        school.accountId = account.id;
        await this.companyDetailRepo.save(school);
        return { message: 'Sub Admin assigned to the school', account };
    }
    async createStaff(dto, createdBy) {
        return this.createUser(dto, enum_1.UserRole.STAFF, createdBy);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(2, (0, typeorm_1.InjectRepository)(login_history_entity_1.LoginHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(user_permission_entity_1.UserPermission)),
    __param(4, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SchoolDetails)),
    __param(5, (0, typeorm_1.InjectRepository)(user_permission_entity_1.UserPermission)),
    __param(6, (0, typeorm_1.InjectRepository)(user_detail_entity_1.UserDetail)),
    __param(7, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map