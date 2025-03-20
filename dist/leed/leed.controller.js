"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeedController = void 0;
const common_1 = require("@nestjs/common");
const leed_service_1 = require("./leed.service");
const create_leed_dto_1 = require("./dto/create-leed.dto");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const account_entity_1 = require("../account/entities/account.entity");
let LeedController = class LeedController {
    constructor(leedService) {
        this.leedService = leedService;
    }
    findByUser(dto, user) {
        return this.leedService.findByUser(dto, user.id);
    }
};
exports.LeedController = LeedController;
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leed_dto_1.LeedPaginationDto, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], LeedController.prototype, "findByUser", null);
exports.LeedController = LeedController = __decorate([
    (0, common_1.Controller)('leed'),
    __metadata("design:paramtypes", [leed_service_1.LeedService])
], LeedController);
//# sourceMappingURL=leed.controller.js.map