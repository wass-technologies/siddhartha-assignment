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
exports.BannerCategoryService = void 0;
const common_1 = require("@nestjs/common");
const banner_category_entity_1 = require("./entities/banner-category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enum_1 = require("../enum");
let BannerCategoryService = class BannerCategoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        for (const categoryId of dto.categoryId) {
            const existingRecord = await this.repo.findOne({
                where: {
                    bannerId: dto.bannerId,
                    categoryId: categoryId,
                },
            });
            if (existingRecord) {
                await this.repo.remove(existingRecord);
            }
            const newRecord = this.repo.create({
                bannerId: dto.bannerId,
                categoryId: categoryId,
            });
            await this.repo.save(newRecord);
        }
        return { message: 'Banner with categories updated successfully' };
    }
    async findAll(dto) {
        const query = await this.repo
            .createQueryBuilder('bannerCategory')
            .leftJoinAndSelect('bannerCategory.banner', 'banner')
            .leftJoinAndSelect('bannerCategory.category', 'category')
            .select([
            'bannerCategory.id',
            'banner.id',
            'banner.image',
            'banner.status',
            'category.id',
            'category.name',
            'category.image',
            'category.status',
        ]);
        if (dto.bannerId && dto.bannerId.length > 0) {
            query.where('bannerCategory.bannerId = :bannerId', {
                bannerId: dto.bannerId,
            });
        }
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async findByUser(dto) {
        const query = await this.repo
            .createQueryBuilder('bannerCategory')
            .leftJoinAndSelect('bannerCategory.banner', 'banner', 'banner.status = :status', { status: enum_1.DefaultStatus.ACTIVE })
            .leftJoinAndSelect('bannerCategory.category', 'category', 'category.status = :status', { status: enum_1.DefaultStatus.ACTIVE })
            .select([
            'bannerCategory.id',
            'banner.id',
            'banner.image',
            'banner.status',
            'category.id',
            'category.name',
            'category.image',
            'category.type',
            'category.status',
        ]);
        if (dto.bannerId && dto.bannerId.length > 0) {
            query.where('bannerCategory.bannerId = :bannerId', {
                bannerId: dto.bannerId,
            });
        }
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async remove(id) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Banner-Category Not Found with this ID');
        }
        return this.repo.remove(result);
    }
};
exports.BannerCategoryService = BannerCategoryService;
exports.BannerCategoryService = BannerCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_category_entity_1.BannerCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BannerCategoryService);
//# sourceMappingURL=banner-category.service.js.map