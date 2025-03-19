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
exports.SettingsService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor(repo, cacheManager) {
        this.repo = repo;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        const result = await this.repo.findOne({
            where: [
                { admin_domain: dto.admin_domain },
                { user_domain: dto.user_domain },
            ],
        });
        if (result) {
            throw new common_1.ConflictException('Setting already exists!');
        }
        delete dto['id'];
        const obj = Object.create(dto);
        return this.repo.save(obj);
    }
    async findAll() {
        return this.repo.createQueryBuilder('setting').getOne();
    }
    async findOne(id) {
        return this.getSetting(id);
    }
    async findSetting(domain) {
        return this.getSetting(domain);
    }
    async update(id, dto) {
        const result = await this.getSetting(id);
        this.deleteSetting(id);
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.getSetting(id);
        const obj = Object.assign(result, dto);
        this.deleteSetting(id);
        return this.repo.save(obj);
    }
    async deleteSetting(id) {
        this.cacheManager.del('setting' + id);
    }
    async getSetting(id) {
        let result = await this.cacheManager.get('setting' + id);
        if (!result) {
            result = await this.repo
                .createQueryBuilder('setting')
                .select([
                'setting.id',
                'setting.title',
                'setting.logo',
                'setting.logoPath',
                'setting.user_domain',
                'setting.admin_domain',
                'setting.status',
                'setting.createdAt',
                'setting.updatedAt',
            ])
                .where('setting.id = :id OR setting.user_domain = :user_domain OR setting.admin_domain = :admin_domain', {
                id,
                user_domain: id,
                admin_domain: id,
            })
                .getOne();
            this.cacheManager.set('setting' + id, result, 7 * 24 * 60 * 60 * 1000);
        }
        if (!result) {
            throw new common_1.NotFoundException(`Something bad happened! Please contact to admin!`);
        }
        return result;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], SettingsService);
//# sourceMappingURL=settings.service.js.map