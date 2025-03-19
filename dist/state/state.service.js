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
exports.StateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const state_entity_1 = require("./entities/state.entity");
let StateService = class StateService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const state = await this.repo.findOne({ where: { name: dto.name } });
        if (state) {
            throw new common_1.ConflictException('State already exists!');
        }
        const obj = Object.create(dto);
        return this.repo.save(obj);
    }
    async findAll(limit, offset, keyword, status) {
        const [result, total] = await this.repo
            .createQueryBuilder('state')
            .where('state.status = :status', { status: status })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('state.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN state.name LIKE '${keyword}%' THEN 0 ELSE 1 END, state.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async find(limit, offset, keyword) {
        const [result, total] = await this.repo
            .createQueryBuilder('state')
            .where('state.status = :status', { status: true })
            .andWhere(new typeorm_2.Brackets((qb) => {
            qb.where('state.name LIKE :pname', {
                pname: '%' + keyword + '%',
            });
        }))
            .orderBy(`CASE WHEN state.name LIKE '${keyword}%' THEN 0 ELSE 1 END, state.name`, 'ASC')
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { result, total };
    }
    async update(id, dto) {
        try {
            const state = await this.repo.findOne({ where: { id } });
            if (!state) {
                throw new common_1.NotFoundException('State not found!');
            }
            const obj = Object.assign(state, { name: dto.name });
            return this.repo.save(obj);
        }
        catch (error) {
            throw new common_1.NotAcceptableException('Either catgeory exists or invalid name!');
        }
    }
    async status(id, dto) {
        const menu = await this.repo.findOne({ where: { id } });
        if (!menu) {
            throw new common_1.NotFoundException('State not found!');
        }
        const obj = Object.assign(menu, dto);
        return this.repo.save(obj);
    }
};
exports.StateService = StateService;
exports.StateService = StateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(state_entity_1.State)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StateService);
//# sourceMappingURL=state.service.js.map