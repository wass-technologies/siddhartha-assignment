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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const bool_status_dto_1 = require("../common/dto/bool-status.dto");
const enum_1 = require("../enum");
const city_service_1 = require("./city.service");
const city_dto_1 = require("./dto/city.dto");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    create(dto) {
        return this.cityService.create(dto);
    }
    findList() {
        return this.cityService.findListAll();
    }
    findAll(query, stateId) {
        const keyword = query.keyword || '';
        return this.cityService.findAll(query.limit, query.offset, keyword, query.status, +stateId);
    }
    find(query, stateId) {
        const keyword = query.keyword || '';
        return this.cityService.find(query.limit, query.offset, keyword, +stateId);
    }
    update(id, dto) {
        return this.cityService.update(+id, dto);
    }
    status(id, dto) {
        return this.cityService.status(+id, dto);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.CityDto]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CityController.prototype, "findList", null);
__decorate([
    (0, common_1.Get)('list/all/:stateId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.PaginationSDto, String]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list/:stateId'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.PaginationSDto, String]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, city_dto_1.UpdateCityDto]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bool_status_dto_1.BoolStatusDto]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "status", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map