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
exports.UserPermissionsService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_permission_entity_1 = require("./entities/user-permission.entity");
let UserPermissionsService = class UserPermissionsService {
    constructor(repo, cacheManager) {
        this.repo = repo;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        return this.repo.save(dto);
    }
    async update(dto) {
        try {
            this.delPermissions(dto[0].accountId);
            return this.repo.save(dto);
        }
        catch (error) {
            throw new common_1.NotAcceptableException('Something bad happened! Try after some time!');
        }
    }
    delPermissions(id) {
        this.cacheManager.del('userPermission' + id);
    }
};
exports.UserPermissionsService = UserPermissionsService;
exports.UserPermissionsService = UserPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_permission_entity_1.UserPermission)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UserPermissionsService);
//# sourceMappingURL=user-permissions.service.js.map