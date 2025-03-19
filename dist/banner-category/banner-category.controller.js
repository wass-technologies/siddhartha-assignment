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
exports.BannerCategoryController = void 0;
const common_1 = require("@nestjs/common");
const banner_category_service_1 = require("./banner-category.service");
const create_banner_category_dto_1 = require("./dto/create-banner-category.dto");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
let BannerCategoryController = class BannerCategoryController {
    constructor(bannerCategoryService) {
        this.bannerCategoryService = bannerCategoryService;
    }
    create(dto) {
        return this.bannerCategoryService.create(dto);
    }
    findAll(dto) {
        return this.bannerCategoryService.findAll(dto);
    }
    findByUser(dto) {
        return this.bannerCategoryService.findByUser(dto);
    }
    remove(id) {
        return this.bannerCategoryService.remove(id);
    }
};
exports.BannerCategoryController = BannerCategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_category_dto_1.CreateBannerCategoryDto]),
    __metadata("design:returntype", void 0)
], BannerCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('MAIN_ADMIN'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_category_dto_1.BannerCategoryPaginationDto]),
    __metadata("design:returntype", void 0)
], BannerCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_category_dto_1.BannerCategoryPaginationDto]),
    __metadata("design:returntype", void 0)
], BannerCategoryController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannerCategoryController.prototype, "remove", null);
exports.BannerCategoryController = BannerCategoryController = __decorate([
    (0, common_1.Controller)('banner-category'),
    __metadata("design:paramtypes", [banner_category_service_1.BannerCategoryService])
], BannerCategoryController);
//# sourceMappingURL=banner-category.controller.js.map