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
exports.SchoolDetails = void 0;
const account_entity_1 = require("../../account/entities/account.entity");
const class_entity_1 = require("../../class/entities/class.entity");
const company_schedule_entity_1 = require("../../company-schedule/entities/company-schedule.entity");
const enum_1 = require("../../enum");
const leed_entity_1 = require("../../leed/entities/leed.entity");
const typeorm_1 = require("typeorm");
let SchoolDetails = class SchoolDetails {
};
exports.SchoolDetails = SchoolDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SchoolDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SchoolDetails.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "schoolName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "address1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "address2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "schoolDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_1.SchoolStatus, default: enum_1.SchoolStatus.PENDING }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SchoolDetails.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SchoolDetails.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SchoolDetails.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.schools, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", account_entity_1.Account)
], SchoolDetails.prototype, "subAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_schedule_entity_1.CompanySchedule, (companySchedule) => companySchedule.companyDetail),
    __metadata("design:type", Array)
], SchoolDetails.prototype, "companySchedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leed_entity_1.Leed, (leed) => leed.companyDetail),
    __metadata("design:type", Array)
], SchoolDetails.prototype, "leed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_entity_1.ClassEntity, (classEntity) => classEntity.school),
    __metadata("design:type", Array)
], SchoolDetails.prototype, "classes", void 0);
exports.SchoolDetails = SchoolDetails = __decorate([
    (0, typeorm_1.Entity)()
], SchoolDetails);
//# sourceMappingURL=company-detail.entity.js.map