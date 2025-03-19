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
exports.PaginationDto = exports.PaginationSDto = exports.StatusDto = exports.SchoolDetailDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../enum");
class SchoolDetailDto {
}
exports.SchoolDetailDto = SchoolDetailDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "schoolName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "area", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "address1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "address2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "pincode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], SchoolDetailDto.prototype, "schoolDesc", void 0);
class StatusDto {
}
exports.StatusDto = StatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enum_1.SchoolStatus),
    __metadata("design:type", String)
], StatusDto.prototype, "status", void 0);
class PaginationSDto {
}
exports.PaginationSDto = PaginationSDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], PaginationSDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaginationSDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationSDto.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enum_1.SchoolStatus),
    __metadata("design:type", String)
], PaginationSDto.prototype, "status", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaginationDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "keyword", void 0);
//# sourceMappingURL=company-detail.dto.js.map