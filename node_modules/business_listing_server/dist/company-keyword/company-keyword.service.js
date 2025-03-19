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
exports.CompanyKeywordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_keyword_entity_1 = require("./entities/company-keyword.entity");
const typeorm_2 = require("typeorm");
let CompanyKeywordService = class CompanyKeywordService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto, accountId) {
        const keywords = dto.keyword.split(',');
        const data = [];
        keywords.forEach((element) => {
            data.push({ keyword: element, accountId: accountId });
        });
        return this.repo.save(data);
    }
    async findAll(dto, accountId) {
        let keyword = dto.keyword || '';
        const query = this.repo
            .createQueryBuilder('companyKeyword')
            .select(['companyKeyword.id', 'companyKeyword.keyword'])
            .where('companyKeyword.accountId = :accountId', { accountId: accountId })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('companyKeyword.keyword LIKE :keyword', {
                keyword: '%' + keyword + '%',
            });
        }));
        const [result, count] = await query
            .orderBy({ 'companyKeyword.keyword': 'ASC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, count };
    }
    async findOne(dto) {
        let keyword = dto.keyword || '';
        const query = this.repo
            .createQueryBuilder('companyKeyword')
            .select(['companyKeyword.keyword'])
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('companyKeyword.keyword LIKE :keyword', {
                keyword: '%' + keyword + '%',
            });
        }));
        const [result, count] = await query
            .orderBy({ 'companyKeyword.keyword': 'ASC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, count };
    }
    async remove(id, accountId) {
        const result = await this.repo.findOne({
            where: { id: id, accountId: accountId },
        });
        if (!result)
            throw new common_1.NotFoundException('Keyword Not Found');
        else
            return this.repo.remove(result);
    }
};
exports.CompanyKeywordService = CompanyKeywordService;
exports.CompanyKeywordService = CompanyKeywordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_keyword_entity_1.CompanyKeyword)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyKeywordService);
//# sourceMappingURL=company-keyword.service.js.map