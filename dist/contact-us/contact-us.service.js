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
exports.ContactUsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_us_entity_1 = require("./entities/contact-us.entity");
const typeorm_2 = require("typeorm");
let ContactUsService = class ContactUsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const obj = Object.create(dto);
        return this.repo.save(obj);
    }
    async findAll(dto) {
        const keyword = dto.keyword || '';
        const [result, count] = await this.repo.findAndCount({
            take: dto.limit,
            skip: dto.offset,
            where: {
                name: (0, typeorm_2.Like)('%' + keyword + '%'),
                query: (0, typeorm_2.Like)('%' + keyword + '%'),
                phoneNumber: (0, typeorm_2.Like)('%' + keyword + '%'),
                message: (0, typeorm_2.Like)('%' + keyword + '%'),
            },
        });
        return { result, count };
    }
};
exports.ContactUsService = ContactUsService;
exports.ContactUsService = ContactUsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_us_entity_1.ContactUs)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactUsService);
//# sourceMappingURL=contact-us.service.js.map