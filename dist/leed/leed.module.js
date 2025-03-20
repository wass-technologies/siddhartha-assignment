"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeedModule = void 0;
const common_1 = require("@nestjs/common");
const leed_service_1 = require("./leed.service");
const leed_controller_1 = require("./leed.controller");
const typeorm_1 = require("@nestjs/typeorm");
const leed_entity_1 = require("./entities/leed.entity");
const auth_module_1 = require("../auth/auth.module");
const call_history_entity_1 = require("../call-history/entities/call-history.entity");
let LeedModule = class LeedModule {
};
exports.LeedModule = LeedModule;
exports.LeedModule = LeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([leed_entity_1.Leed, call_history_entity_1.CallHistory]),
            auth_module_1.AuthModule,
        ],
        controllers: [leed_controller_1.LeedController],
        providers: [leed_service_1.LeedService],
    })
], LeedModule);
//# sourceMappingURL=leed.module.js.map