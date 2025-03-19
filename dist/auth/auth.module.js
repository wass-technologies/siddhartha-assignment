"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const axios_1 = require("@nestjs/axios");
const login_history_entity_1 = require("../login-history/entities/login-history.entity");
const user_permission_entity_1 = require("../user-permissions/entities/user-permission.entity");
const casl_ability_factory_1 = require("./factory/casl-ability.factory");
const permissions_guard_1 = require("./guards/permissions.guard");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
const company_schedule_entity_1 = require("../company-schedule/entities/company-schedule.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                account_entity_1.Account,
                login_history_entity_1.LoginHistory,
                user_permission_entity_1.UserPermission,
                company_detail_entity_1.SchoolDetails,
                user_detail_entity_1.UserDetail,
                company_schedule_entity_1.CompanySchedule
            ]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => {
                    return {
                        secret: process.env.BL_JWT_SECRET,
                        signOptions: {
                            expiresIn: process.env.BL_JWT_EXPIRE,
                        },
                    };
                },
            }),
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, casl_ability_factory_1.CaslAbilityFactory, permissions_guard_1.PermissionsGuard],
        exports: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
            jwt_1.JwtModule,
            casl_ability_factory_1.CaslAbilityFactory,
            permissions_guard_1.PermissionsGuard,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map