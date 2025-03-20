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
exports.SubAdmin = void 0;
const account_entity_1 = require("../../account/entities/account.entity");
const user_detail_entity_1 = require("../../user-details/entities/user-detail.entity");
const typeorm_1 = require("typeorm");
let SubAdmin = class SubAdmin {
};
exports.SubAdmin = SubAdmin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubAdmin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubAdmin.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SubAdmin.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SubAdmin.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.subAdmins),
    __metadata("design:type", account_entity_1.Account)
], SubAdmin.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_detail_entity_1.School, (school) => school.subAdmins, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", user_detail_entity_1.School)
], SubAdmin.prototype, "school", void 0);
exports.SubAdmin = SubAdmin = __decorate([
    (0, typeorm_1.Entity)()
], SubAdmin);
//# sourceMappingURL=company-detail.entity.js.map