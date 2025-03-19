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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const banner_category_entity_1 = require("../../banner-category/entities/banner-category.entity");
const enum_1 = require("../../enum");
const typeorm_1 = require("typeorm");
let Banner = class Banner {
};
exports.Banner = Banner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Banner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Banner.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Banner.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_1.DefaultStatus, default: enum_1.DefaultStatus.PENDING }),
    __metadata("design:type", String)
], Banner.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Banner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Banner.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banner_category_entity_1.BannerCategory, (bannerCategory) => bannerCategory.banner),
    __metadata("design:type", Array)
], Banner.prototype, "bannerCategory", void 0);
exports.Banner = Banner = __decorate([
    (0, typeorm_1.Entity)()
], Banner);
//# sourceMappingURL=banner.entity.js.map