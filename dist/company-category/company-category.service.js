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
exports.CompanyCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_category_entity_1 = require("./entities/company-category.entity");
const enum_1 = require("../enum");
let CompanyCategoryService = class CompanyCategoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto, accountId) {
        const result = await this.repo.findOne({
            where: {
                accountId: accountId,
                categoryId: dto.categoryId,
            },
        });
        if (result) {
            throw new common_1.ConflictException('Already exists!');
        }
        const obj = Object.create(dto);
        return this.repo.save(obj);
    }
    async offer(id, offer) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Not found!');
        }
        const numOffer = parseInt(offer.offer);
        if (numOffer == 0) {
            const obj = Object.assign(result, {
                offer: 0,
                isOffer: enum_1.YNStatus.NO,
            });
            return this.repo.save(obj);
        }
        else {
            const obj = Object.assign(result, {
                offer: numOffer,
                isOffer: enum_1.YNStatus.YES,
            });
            return this.repo.save(obj);
        }
    }
    async remove(id) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Not found!');
        }
        return this.repo.remove(result);
    }
};
exports.CompanyCategoryService = CompanyCategoryService;
exports.CompanyCategoryService = CompanyCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_category_entity_1.CompanyCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyCategoryService);
//# sourceMappingURL=company-category.service.js.map