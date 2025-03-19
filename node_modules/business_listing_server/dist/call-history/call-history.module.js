"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const call_history_service_1 = require("./call-history.service");
const call_history_controller_1 = require("./call-history.controller");
const typeorm_1 = require("@nestjs/typeorm");
const call_history_entity_1 = require("./entities/call-history.entity");
const auth_module_1 = require("../auth/auth.module");
let CallHistoryModule = class CallHistoryModule {
};
exports.CallHistoryModule = CallHistoryModule;
exports.CallHistoryModule = CallHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([call_history_entity_1.CallHistory]), auth_module_1.AuthModule],
        controllers: [call_history_controller_1.CallHistoryController],
        providers: [call_history_service_1.CallHistoryService],
    })
], CallHistoryModule);
//# sourceMappingURL=call-history.module.js.map