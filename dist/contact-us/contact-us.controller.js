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
exports.ContactUsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_pagination_dto_1 = require("../common/dto/common-pagination.dto");
const enum_1 = require("../enum");
const contact_us_service_1 = require("./contact-us.service");
const create_contact_us_dto_1 = require("./dto/create-contact-us.dto");
let ContactUsController = class ContactUsController {
    constructor(contactUsService) {
        this.contactUsService = contactUsService;
    }
    create(dto) {
        return this.contactUsService.create(dto);
    }
    findAll(dto) {
        return this.contactUsService.findAll(dto);
    }
};
exports.ContactUsController = ContactUsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_us_dto_1.CreateContactUsDto]),
    __metadata("design:returntype", void 0)
], ContactUsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_pagination_dto_1.CommonPaginationDto]),
    __metadata("design:returntype", void 0)
], ContactUsController.prototype, "findAll", null);
exports.ContactUsController = ContactUsController = __decorate([
    (0, common_1.Controller)('contact-us'),
    __metadata("design:paramtypes", [contact_us_service_1.ContactUsService])
], ContactUsController);
//# sourceMappingURL=contact-us.controller.js.map