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
exports.LanguagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../enum");
const typeorm_2 = require("typeorm");
const language_entity_1 = require("./entities/language.entity");
let LanguagesService = class LanguagesService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const result = await this.repo.findOne({
            where: { name: dto.name },
        });
        if (result) {
            throw new common_1.ConflictException('Language already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async find(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo.findAndCount({
            where: {
                name: (0, typeorm_2.Like)('%' + keyword + '%'),
                status: enum_1.DefaultStatus.ACTIVE,
            },
            take: dto.limit,
            skip: dto.offset,
        });
        return { result, total };
    }
    async findAll(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo.findAndCount({
            where: {
                name: (0, typeorm_2.Like)('%' + keyword + '%'),
                status: dto.status,
            },
            take: dto.limit,
            skip: dto.offset,
        });
        return { result, total };
    }
    async update(id, dto) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Language not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Language not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
};
exports.LanguagesService = LanguagesService;
exports.LanguagesService = LanguagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(language_entity_1.Language)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LanguagesService);
//# sourceMappingURL=languages.service.js.map