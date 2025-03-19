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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const account_entity_1 = require("../account/entities/account.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const enum_1 = require("../enum");
const notification_dto_1 = require("./dto/notification.dto");
const notifications_service_1 = require("./notifications.service");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async bulk(body) {
        const res = await this.notificationsService.sendBulkNotification(body.desc, body.title, '/topics/all', false);
        if (res && res.success == 1) {
            return this.notificationsService.create({
                title: body.title,
                desc: body.desc,
                type: body.type,
                accountId: null,
            });
        }
        else {
            throw new common_1.NotAcceptableException('Try after some time!');
        }
    }
    async single(body) {
        const res = await this.notificationsService.sendBulkNotification(body.desc, body.title, body.deviceId, false);
        if (res && res.success == 1) {
            return this.notificationsService.create({
                title: body.title,
                desc: body.desc,
                type: body.type,
                accountId: body.accountId,
            });
        }
        else {
            throw new common_1.NotAcceptableException('Try after some time!');
        }
    }
    async multi(body) {
        const res = await this.notificationsService.sendBulkNotification(body.desc, body.title, body.deviceId, true);
        if (res && res.success == 1) {
            for (const i in body.accountId) {
                await this.notificationsService.create({
                    title: body.title,
                    desc: body.desc,
                    type: body.type,
                    accountId: body.accountId[i],
                });
            }
            return 'Success';
        }
        else {
            throw new common_1.NotAcceptableException('Try after some time!');
        }
    }
    findAll(query, user) {
        const limit = query.limit || 10;
        const offset = query.offset || 0;
        return this.notificationsService.findAll(limit, offset, user.id);
    }
    update(id, status, user) {
        return this.notificationsService.update(+id, user.id, status);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)('bulk'),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "bulk", null);
__decorate([
    (0, common_1.Post)('single'),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "single", null);
__decorate([
    (0, common_1.Post)('multi'),
    (0, roles_decorator_1.Roles)(...Object.values(enum_1.UserRole)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "multi", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, account_entity_1.Account]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "update", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map