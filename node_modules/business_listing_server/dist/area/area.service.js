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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const area_entity_1 = require("./entities/area.entity");
let AreaService = class AreaService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const category = await this.repo.findOne({
            where: { name: dto.name, cityId: dto.cityId },
        });
        if (category) {
            throw new common_1.ConflictException('Area already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async findAll(limit, offset, keyword, status, cityId) {
        const [result, total] = await this.repo
            .createQueryBuilder('area')
            .where('area.status = :status AND area.cityId = :cityId', {
            status: status,
            cityId: cityId,
        })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('area.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN area.name LIKE '${keyword}%' THEN 0 ELSE 1 END, area.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async find(limit, offset, keyword, cityId) {
        const [result, total] = await this.repo
            .createQueryBuilder('area')
            .where('area.status = :status AND area.cityId = :cityId', {
            status: true,
            cityId: cityId,
        })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('area.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN area.name LIKE '${keyword}%' THEN 0 ELSE 1 END, area.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async findOne(id) {
        const area = await this.repo.findOne({ where: { id } });
        if (!area) {
            throw new common_1.NotFoundException('Area not found!');
        }
        return area;
    }
    async update(id, dto) {
        try {
            const area = await this.repo.findOne({ where: { id } });
            if (!area) {
                throw new common_1.NotFoundException('Area not found!');
            }
            const obj = Object.assign(area, { name: dto.name });
            return this.repo.save(obj);
        }
        catch (error) {
            throw new common_1.NotAcceptableException('Either area exists or invalid name!');
        }
    }
    async status(id, dto) {
        const menu = await this.repo.findOne({ where: { id } });
        if (!menu) {
            throw new common_1.NotFoundException('Area not found!');
        }
        const obj = Object.assign(menu, dto);
        return this.repo.save(obj);
    }
};
exports.AreaService = AreaService;
exports.AreaService = AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaService);
//# sourceMappingURL=area.service.js.map