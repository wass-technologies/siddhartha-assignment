"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyImageModule = void 0;
const common_1 = require("@nestjs/common");
const company_image_service_1 = require("./company-image.service");
const company_image_controller_1 = require("./company-image.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const company_image_entity_1 = require("./entities/company-image.entity");
const platform_express_1 = require("@nestjs/platform-express");
let CompanyImageModule = class CompanyImageModule {
};
exports.CompanyImageModule = CompanyImageModule;
exports.CompanyImageModule = CompanyImageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_image_entity_1.CompanyImage]), auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({ dest: './uploads/companydetail/images' })],
        controllers: [company_image_controller_1.CompanyImageController],
        providers: [company_image_service_1.CompanyImageService],
    })
], CompanyImageModule);
//# sourceMappingURL=company-image.module.js.map