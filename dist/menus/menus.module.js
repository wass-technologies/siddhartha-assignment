"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const menu_entity_1 = require("./entities/menu.entity");
const menus_controller_1 = require("./menus.controller");
const menus_service_1 = require("./menus.service");
let MenusModule = class MenusModule {
};
exports.MenusModule = MenusModule;
exports.MenusModule = MenusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([menu_entity_1.Menu]),
            auth_module_1.AuthModule,
            cache_manager_1.CacheModule.register(),
        ],
        controllers: [menus_controller_1.MenusController],
        providers: [menus_service_1.MenusService],
        exports: [menus_service_1.MenusService],
    })
], MenusModule);
//# sourceMappingURL=menus.module.js.map