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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const enum_1 = require("../enum");
let CategoryService = class CategoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const category = await this.repo.findOne({ where: { name: dto.name } });
        if (category) {
            throw new common_1.ConflictException('Category already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async findAll(limit, offset, keyword, status) {
        const [result, total] = await this.repo
            .createQueryBuilder('category')
            .where('category.status = :status', { status: status })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('category.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN category.name LIKE '${keyword}%' THEN 0 ELSE 1 END, category.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async find(limit, offset, keyword) {
        const [result, total] = await this.repo
            .createQueryBuilder('category')
            .select([
            'category.id',
            'category.name',
            'category.image',
            'category.status',
            'category.type',
            'category.createdAt',
        ])
            .where('category.status = :status', { status: enum_1.DefaultStatus.ACTIVE })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('category.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN category.name LIKE '${keyword}%' THEN 0 ELSE 1 END, category.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async findByUser(dto) {
        const keyword = dto.keyword || '';
        const query = await this.repo
            .createQueryBuilder('category')
            .select([
            'category.id',
            'category.name',
            'category.image',
            'category.status',
            'category.type',
            'category.createdAt',
        ])
            .where('category.status = :status', { status: enum_1.DefaultStatus.ACTIVE });
        if (dto.type && dto.type.length > 0) {
            query.andWhere('category.type = :type', { type: dto.type });
        }
        const [result, total] = await query
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('category.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, total };
    }
    async findOne(id) {
        const category = await this.repo.findOne({ where: { id: id } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found!');
        }
        return category;
    }
    async update(id, dto) {
        try {
            const category = await this.repo.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException('Category not found!');
            }
            const obj = Object.assign(category, dto);
            return this.repo.save(obj);
        }
        catch (error) {
            throw new common_1.NotAcceptableException('Either catgeory exists or invalid name!');
        }
    }
    async image(image, result) {
        const obj = Object.assign(result, {
            image: process.env.BL_CDN_LINK + image,
            imageName: image,
        });
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const menu = await this.repo.findOne({ where: { id: id } });
        if (!menu) {
            throw new common_1.NotFoundException('Category not found!');
        }
        const obj = Object.assign(menu, dto);
        return this.repo.save(obj);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map