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
exports.FaqsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../enum");
const typeorm_2 = require("typeorm");
const faq_entity_1 = require("./entities/faq.entity");
let FaqsService = class FaqsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const result = await this.repo.findOne({
            where: { accountId: dto.accountId, question: dto.question },
        });
        if (result) {
            throw new common_1.ConflictException('This faq already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async findAll(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
            .createQueryBuilder('faq')
            .where('faq.status = :status', { status: dto.status })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('faq.question LIKE :question OR faq.answer LIKE :answer', {
                question: '%' + keyword + '%',
                answer: '%' + keyword + '%',
            });
        }))
            .orderBy({ 'faq.createdAt': 'DESC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, total };
    }
    async find(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.repo
            .createQueryBuilder('faq')
            .where('faq.status = :status', {
            status: enum_1.DefaultStatus.ACTIVE,
        })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('faq.question LIKE :question OR faq.answer LIKE :answer', {
                question: '%' + keyword + '%',
                answer: '%' + keyword + '%',
            });
        }))
            .orderBy({ 'faq.createdAt': 'DESC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, total };
    }
    async update(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Faq not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
    async status(id, dto) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Faq not found!');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
};
exports.FaqsService = FaqsService;
exports.FaqsService = FaqsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.Faq)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FaqsService);
//# sourceMappingURL=faqs.service.js.map