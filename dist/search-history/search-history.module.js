"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const search_history_service_1 = require("./search-history.service");
const search_history_controller_1 = require("./search-history.controller");
const typeorm_1 = require("@nestjs/typeorm");
const search_history_entity_1 = require("./entities/search-history.entity");
const auth_module_1 = require("../auth/auth.module");
let SearchHistoryModule = class SearchHistoryModule {
};
exports.SearchHistoryModule = SearchHistoryModule;
exports.SearchHistoryModule = SearchHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([search_history_entity_1.SearchHistory]), auth_module_1.AuthModule],
        controllers: [search_history_controller_1.SearchHistoryController],
        providers: [search_history_service_1.SearchHistoryService],
        exports: [search_history_service_1.SearchHistoryService],
    })
], SearchHistoryModule);
//# sourceMappingURL=search-history.module.js.map