"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSubscribersModule = void 0;
const common_1 = require("@nestjs/common");
const email_subscribers_service_1 = require("./email-subscribers.service");
const email_subscribers_controller_1 = require("./email-subscribers.controller");
const email_subscriber_entity_1 = require("./entities/email-subscriber.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
let EmailSubscribersModule = class EmailSubscribersModule {
};
exports.EmailSubscribersModule = EmailSubscribersModule;
exports.EmailSubscribersModule = EmailSubscribersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([email_subscriber_entity_1.EmailSubscriber]), auth_module_1.AuthModule],
        controllers: [email_subscribers_controller_1.EmailSubscribersController],
        providers: [email_subscribers_service_1.EmailSubscribersService],
    })
], EmailSubscribersModule);
//# sourceMappingURL=email-subscribers.module.js.map