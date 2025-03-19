"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const login_history_entity_1 = require("./entities/login-history.entity");
const login_history_controller_1 = require("./login-history.controller");
const login_history_service_1 = require("./login-history.service");
let LoginHistoryModule = class LoginHistoryModule {
};
exports.LoginHistoryModule = LoginHistoryModule;
exports.LoginHistoryModule = LoginHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([login_history_entity_1.LoginHistory]), auth_module_1.AuthModule],
        controllers: [login_history_controller_1.LoginHistoryController],
        providers: [login_history_service_1.LoginHistoryService],
    })
], LoginHistoryModule);
//# sourceMappingURL=login-history.module.js.map