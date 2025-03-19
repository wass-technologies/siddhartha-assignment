"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModule = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_controller_1 = require("./class.controller");
const typeorm_1 = require("@nestjs/typeorm");
const class_entity_1 = require("./entities/class.entity");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const student_entity_1 = require("../student/entities/student.entity");
let ClassModule = class ClassModule {
};
exports.ClassModule = ClassModule;
exports.ClassModule = ClassModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([class_entity_1.ClassEntity, company_detail_entity_1.SchoolDetails, student_entity_1.Student])],
        controllers: [class_controller_1.ClassController],
        providers: [class_service_1.ClassService],
    })
], ClassModule);
//# sourceMappingURL=class.module.js.map