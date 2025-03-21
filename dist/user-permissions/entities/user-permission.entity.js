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
exports.UserPermission = void 0;
const account_entity_1 = require("../../account/entities/account.entity");
const menu_entity_1 = require("../../menus/entities/menu.entity");
const permission_entity_1 = require("../../permissions/entities/permission.entity");
const typeorm_1 = require("typeorm");
let UserPermission = class UserPermission {
};
exports.UserPermission = UserPermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UserPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UserPermission.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPermission.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserPermission.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserPermission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserPermission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.userPermission, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], UserPermission.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => menu_entity_1.Menu, (menu) => menu.userPermission, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], UserPermission.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (permission) => permission.userPermission, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], UserPermission.prototype, "permission", void 0);
exports.UserPermission = UserPermission = __decorate([
    (0, typeorm_1.Entity)()
], UserPermission);
//# sourceMappingURL=user-permission.entity.js.map