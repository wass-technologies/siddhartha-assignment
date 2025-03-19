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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./entities/city.entity");
let CityService = class CityService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const category = await this.repo.findOne({
            where: { name: dto.name, stateId: dto.stateId },
        });
        if (category) {
            throw new common_1.ConflictException('City already exists!');
        }
        const obj = Object.assign(dto);
        return this.repo.save(obj);
    }
    async findAll(limit, offset, keyword, status, stateId) {
        const [result, total] = await this.repo
            .createQueryBuilder('city')
            .where('city.status = :status AND city.stateId = :stateId', {
            status: status,
            stateId: stateId,
        })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('city.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN city.name LIKE '${keyword}%' THEN 0 ELSE 1 END, city.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async find(limit, offset, keyword, stateId) {
        const [result, total] = await this.repo
            .createQueryBuilder('city')
            .where('city.status = :status AND city.stateId = :stateId', {
            status: true,
            stateId: stateId,
        })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('city.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN city.name LIKE '${keyword}%' THEN 0 ELSE 1 END, city.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async findListAll() {
        const [result, total] = await this.repo
            .createQueryBuilder('city')
            .where('city.status = :status', {
            status: true,
        })
            .orderBy({ 'city.name': 'ASC' })
            .getManyAndCount();
        return { result, total };
    }
    async findOne(id) {
        const city = await this.repo.findOne({ where: { id } });
        if (!city) {
            throw new common_1.NotFoundException('City not found!');
        }
        return city;
    }
    async update(id, dto) {
        try {
            const city = await this.repo.findOne({ where: { id } });
            if (!city) {
                throw new common_1.NotFoundException('City not found!');
            }
            const obj = Object.assign(city, { name: dto.name });
            return this.repo.save(obj);
        }
        catch (error) {
            throw new common_1.NotAcceptableException('Either catgeory exists or invalid name!');
        }
    }
    async status(id, dto) {
        const menu = await this.repo.findOne({ where: { id } });
        if (!menu) {
            throw new common_1.NotFoundException('City not found!');
        }
        const obj = Object.assign(menu, dto);
        return this.repo.save(obj);
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CityService);
//# sourceMappingURL=city.service.js.map