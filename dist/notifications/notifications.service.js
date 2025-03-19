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
exports.NotificationsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
let NotificationsService = class NotificationsService {
    constructor(repo, httpService) {
        this.repo = repo;
        this.httpService = httpService;
    }
    async sendBulkNotification(body, title, token, status) {
        const header = {
            headers: {
                'cache-control': 'no-cache',
                authorization: 'key=AAAAqKmoPwY:APA91bEuJpsVMvfhzcwPbXUV3B6Wu6kQl8iA6738dXuvdMHSELGZegyGLc90uP0LqTSGkzMv08ULzE29_lDsvJTSUr2BH2Flk-w2',
                'content-type': 'application/json',
            },
        };
        let data = null;
        if (status) {
            data = JSON.stringify({
                registration_ids: token,
                data: { body: body, title: title, sound: 'default', type: 1 },
                notification: { body: body, title: title, sound: 'default', type: 1 },
            });
        }
        else {
            data = JSON.stringify({
                to: token,
                data: { body: body, title: title, sound: 'default', type: 1 },
                notification: { body: body, title: title, sound: 'default', type: 1 },
            });
        }
        try {
            const result = await this.httpService.axiosRef.post(`https://fcm.googleapis.com/fcm/send`, data, header);
            if (result.data) {
                return result.data;
            }
        }
        catch (error) {
            return false;
        }
    }
    async create(createDto) {
        const result = await this.repo.count({
            where: {
                title: createDto.title,
                desc: createDto.desc,
                type: createDto.type,
                accountId: createDto.accountId,
            },
        });
        if (!result) {
            return this.repo.save(createDto);
        }
        else {
            return true;
        }
    }
    async findAll(limit, offset, accountId) {
        const [result, total] = await this.repo
            .createQueryBuilder('notification')
            .leftJoinAndSelect('notification.account', 'account')
            .leftJoinAndSelect('account.userDetail', 'userDetail')
            .where('notification.accountId = :accountId OR notification.accountId IS NULL', {
            accountId: accountId,
        })
            .skip(offset)
            .take(limit)
            .orderBy({ 'notification.createdAt': 'DESC' })
            .getManyAndCount();
        return { result, total };
    }
    async update(id, accountId, status) {
        const notifs = await this.repo.findOne({ where: { id, accountId } });
        if (!notifs) {
            throw new common_1.NotFoundException('Notification not found!');
        }
        const obj = Object.assign(notifs, { read: status });
        return this.repo.save(obj);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map