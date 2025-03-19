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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const banner_entity_1 = require("./entities/banner.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enum_1 = require("../enum");
let BannerService = class BannerService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(image) {
        const obj = Object.assign({
            image: process.env.BL_CDN_LINK + image,
            imagePath: image,
        });
        return this.repo.save(obj);
    }
    async findAll(dto) {
        const query = await this.repo
            .createQueryBuilder('banner')
            .where('banner.status = :status', {
            status: dto.status,
        });
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async findByUser(dto) {
        const query = await this.repo
            .createQueryBuilder('banner')
            .where('banner.status = :status', {
            status: enum_1.DefaultStatus.ACTIVE,
        });
        const [result, count] = await query
            .take(dto.limit)
            .skip(dto.offset)
            .getManyAndCount();
        return { result, count };
    }
    async findOne(id) {
        const result = await this.repo.findOne({ where: { id: id } });
        if (!result) {
            throw new common_1.NotFoundException('Banner Not Found..');
        }
        return result;
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
            throw new common_1.NotFoundException('Banner Not Found..');
        }
        const obj = Object.assign(result, dto);
        return this.repo.save(obj);
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_entity_1.Banner)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BannerService);
//# sourceMappingURL=banner.service.js.map