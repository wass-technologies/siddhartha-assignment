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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const bool_status_dto_1 = require("../common/dto/bool-status.dto");
const enum_1 = require("../enum");
const area_service_1 = require("./area.service");
const area_dto_1 = require("./dto/area.dto");
let AreaController = class AreaController {
    constructor(areaService) {
        this.areaService = areaService;
    }
    create(dto) {
        return this.areaService.create(dto);
    }
    findAll(query, cityId) {
        const keyword = query.keyword || '';
        return this.areaService.findAll(query.limit, query.offset, keyword, query.status, +cityId);
    }
    find(query, cityId) {
        const keyword = query.keyword || '';
        return this.areaService.find(query.limit, query.offset, keyword, +cityId);
    }
    update(id, dto) {
        return this.areaService.update(+id, dto);
    }
    status(id, dto) {
        return this.areaService.status(+id, dto);
    }
};
exports.AreaController = AreaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_dto_1.AreaDto]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list/all/:cityId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_dto_1.PaginationSDto, String]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list/:cityId'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_dto_1.PaginationSDto, String]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bool_status_dto_1.BoolStatusDto]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "status", null);
exports.AreaController = AreaController = __decorate([
    (0, common_1.Controller)('area'),
    __metadata("design:paramtypes", [area_service_1.AreaService])
], AreaController);
//# sourceMappingURL=area.controller.js.map