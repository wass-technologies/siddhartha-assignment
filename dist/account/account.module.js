"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const menus_module_1 = require("../menus/menus.module");
const permissions_module_1 = require("../permissions/permissions.module");
const user_permissions_module_1 = require("../user-permissions/user-permissions.module");
const account_controller_1 = require("./account.controller");
const account_service_1 = require("./account.service");
const account_entity_1 = require("./entities/account.entity");
const search_history_module_1 = require("../search-history/search-history.module");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const staff_detail_entity_1 = require("../staff-details/entities/staff-detail.entity");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, user_detail_entity_1.School, company_detail_entity_1.SubAdmin, staff_detail_entity_1.StaffDetail]),
            auth_module_1.AuthModule,
            menus_module_1.MenusModule,
            permissions_module_1.PermissionsModule,
            user_permissions_module_1.UserPermissionsModule,
            search_history_module_1.SearchHistoryModule,
        ],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService],
        exports: [account_service_1.AccountService],
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map