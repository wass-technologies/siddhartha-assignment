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
exports.CompanyImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_image_entity_1 = require("./entities/company-image.entity");
const typeorm_2 = require("typeorm");
let CompanyImageService = class CompanyImageService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(accountId, image) {
        const obj = Object.create({
            file: process.env.BL_CDN_LINK + image,
            fileName: image,
            accountId: accountId,
        });
        return this.repo.save(obj);
    }
    async findOne(id) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Media not found!');
        }
        return result;
    }
    async updateImage(image, result) {
        const obj = Object.assign(result, {
            file: process.env.BL_CDN_LINK + image,
            fileName: image,
        });
        return this.repo.save(obj);
    }
    async remove(id) {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException('Media not found!');
        }
        return this.repo.remove(result);
    }
};
exports.CompanyImageService = CompanyImageService;
exports.CompanyImageService = CompanyImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_image_entity_1.CompanyImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyImageService);
//# sourceMappingURL=company-image.service.js.map