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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const enum_1 = require("../enum");
let BlogsService = class BlogsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const result = await this.repo.findOne({ where: { title: dto.title } });
        if (result) {
            throw new common_1.ConflictException('Blogs already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async findAll(dto) {
        const keyword = dto.keyword || '';
        const queryBuilder = this.repo.createQueryBuilder('blog');
        queryBuilder.andWhere('blog.status = :status', { status: enum_1.DefaultStatus.ACTIVE });
        if (keyword) {
            queryBuilder.andWhere('(blog.title LIKE :keyword OR blog.desc LIKE :keyword)', { keyword: `%${keyword}%` });
        }
        queryBuilder.take(dto.limit).skip(dto.offset);
        const [result, count] = await queryBuilder.getManyAndCount();
        return { result, count };
    }
    async findAllByAdmin(dto) {
        const keyword = dto.keyword || '';
        const queryBuilder = this.repo.createQueryBuilder('blog');
        if (dto.status) {
            queryBuilder.andWhere('blog.status = :status', { status: dto.status });
        }
        if (keyword) {
            queryBuilder.andWhere('(blog.title LIKE :keyword OR blog.desc LIKE :keyword)', { keyword: `%${keyword}%` });
        }
        queryBuilder.take(dto.limit).skip(dto.offset);
        const [result, count] = await queryBuilder.getManyAndCount();
        return { result, count };
    }
    async findOne(id) {
        const result = await this.repo.findOne({
            where: { id: id, status: enum_1.DefaultStatus.ACTIVE },
        });
        if (!result) {
            throw new common_1.NotFoundException('Blog not found..');
        }
        return result;
    }
    async update(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Blog not found..');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async image(image, result) {
        const obj = Object.assign(result, {
            image: process.env.BL_CDN_LINK + image,
            imagePath: image,
        });
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Blog not found..');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map