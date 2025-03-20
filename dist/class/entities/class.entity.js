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
exports.ClassEntity = void 0;
const student_entity_1 = require("../../student/entities/student.entity");
const user_detail_entity_1 = require("../../user-details/entities/user-detail.entity");
const typeorm_1 = require("typeorm");
let ClassEntity = class ClassEntity {
};
exports.ClassEntity = ClassEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClassEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ClassEntity.prototype, "className", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_detail_entity_1.School, (company) => company.classes, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_detail_entity_1.School)
], ClassEntity.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.class),
    __metadata("design:type", Array)
], ClassEntity.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ClassEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ClassEntity.prototype, "updatedAt", void 0);
exports.ClassEntity = ClassEntity = __decorate([
    (0, typeorm_1.Entity)()
], ClassEntity);
//# sourceMappingURL=class.entity.js.map