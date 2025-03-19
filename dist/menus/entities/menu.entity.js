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
exports.Menu = void 0;
const user_permission_entity_1 = require("../../user-permissions/entities/user-permission.entity");
const typeorm_1 = require("typeorm");
let Menu = class Menu {
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Menu.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_permission_entity_1.UserPermission, (userPermission) => userPermission.menu),
    __metadata("design:type", Array)
], Menu.prototype, "userPermission", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)()
], Menu);
//# sourceMappingURL=menu.entity.js.map