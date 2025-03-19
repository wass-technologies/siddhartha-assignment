import { Account } from 'src/account/entities/account.entity';
import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    bulk(body: NotificationDto): Promise<any>;
    single(body: NotificationDto): Promise<any>;
    multi(body: NotificationDto): Promise<string>;
    findAll(query: any, user: Account): Promise<{
        result: import("./entities/notification.entity").Notification[];
        total: number;
    }>;
    update(id: string, status: boolean, user: Account): Promise<import("./entities/notification.entity").Notification & {
        read: boolean;
    }>;
}
