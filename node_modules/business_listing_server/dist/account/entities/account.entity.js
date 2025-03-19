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
exports.Account = void 0;
const company_detail_entity_1 = require("../../company-details/entities/company-detail.entity");
const enum_1 = require("../../enum");
const user_detail_entity_1 = require("../../user-details/entities/user-detail.entity");
const user_permission_entity_1 = require("../../user-permissions/entities/user-permission.entity");
const typeorm_1 = require("typeorm");
let Account = class Account {
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_1.UserRole, default: enum_1.UserRole.STAFF }),
    __metadata("design:type", String)
], Account.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_1.DefaultStatus, default: enum_1.DefaultStatus.ACTIVE }),
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_detail_entity_1.SchoolDetails, (school) => school.subAdmin),
    __metadata("design:type", Array)
], Account.prototype, "schools", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_permission_entity_1.UserPermission, (userPermission) => userPermission.account),
    __metadata("design:type", Array)
], Account.prototype, "userPermission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_detail_entity_1.UserDetail, (userDetail) => userDetail.account),
    __metadata("design:type", Array)
], Account.prototype, "userDetail", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
//# sourceMappingURL=account.entity.js.map