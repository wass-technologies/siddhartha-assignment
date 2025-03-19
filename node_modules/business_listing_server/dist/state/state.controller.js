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
exports.StateController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const bool_status_dto_1 = require("../common/dto/bool-status.dto");
const enum_1 = require("../enum");
const state_dto_1 = require("./dto/state.dto");
const state_service_1 = require("./state.service");
let StateController = class StateController {
    constructor(stateService) {
        this.stateService = stateService;
    }
    create(dto) {
        return this.stateService.create(dto);
    }
    findAll(query) {
        const keyword = query.keyword || '';
        return this.stateService.findAll(query.limit, query.offset, keyword, query.status);
    }
    find(query) {
        const keyword = query.keyword || '';
        return this.stateService.find(query.limit, query.offset, keyword);
    }
    update(id, dto) {
        return this.stateService.update(+id, dto);
    }
    status(id, dto) {
        return this.stateService.status(+id, dto);
    }
};
exports.StateController = StateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_dto_1.StateDto]),
    __metadata("design:returntype", void 0)
], StateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list/all'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_dto_1.PaginationSDto]),
    __metadata("design:returntype", void 0)
], StateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [state_dto_1.PaginationSDto]),
    __metadata("design:returntype", void 0)
], StateController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, state_dto_1.StateDto]),
    __metadata("design:returntype", void 0)
], StateController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bool_status_dto_1.BoolStatusDto]),
    __metadata("design:returntype", void 0)
], StateController.prototype, "status", null);
exports.StateController = StateController = __decorate([
    (0, common_1.Controller)('state'),
    __metadata("design:paramtypes", [state_service_1.StateService])
], StateController);
//# sourceMappingURL=state.controller.js.map