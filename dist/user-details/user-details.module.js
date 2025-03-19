"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const user_detail_entity_1 = require("./entities/user-detail.entity");
const user_details_controller_1 = require("./user-details.controller");
const user_details_service_1 = require("./user-details.service");
const account_entity_1 = require("../account/entities/account.entity");
let UserDetailsModule = class UserDetailsModule {
};
exports.UserDetailsModule = UserDetailsModule;
exports.UserDetailsModule = UserDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_detail_entity_1.UserDetail, account_entity_1.Account]),
            auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({ dest: './uploads/UserDetail' }),
        ],
        controllers: [user_details_controller_1.UserDetailsController],
        providers: [user_details_service_1.UserDetailsService],
        exports: [user_details_service_1.UserDetailsService],
    })
], UserDetailsModule);
//# sourceMappingURL=user-details.module.js.map