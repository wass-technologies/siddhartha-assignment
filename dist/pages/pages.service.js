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
exports.PagesService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const page_entity_1 = require("./entities/page.entity");
let PagesService = class PagesService {
    constructor(repo, cacheManager) {
        this.repo = repo;
        this.cacheManager = cacheManager;
        this.delPage = (id) => {
            this.cacheManager.del('page' + id);
        };
        this.getPage = async (id) => {
            let result = await this.cacheManager.get('page' + id);
            if (!result) {
                result = await this.repo.findOne({ where: { id } });
                this.cacheManager.set('page' + id, result, 7 * 24 * 60 * 60 * 1000);
            }
            if (!result) {
                throw new common_1.NotFoundException('Not found!');
            }
            return result;
        };
    }
    findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.getPage(id);
    }
    async update(id, updatePageDto) {
        const page = await this.getPage(id);
        this.delPage(id);
        const obj = Object.assign(page, updatePageDto);
        return this.repo.save(obj);
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], PagesService);
//# sourceMappingURL=pages.service.js.map