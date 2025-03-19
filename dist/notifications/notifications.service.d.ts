import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly repo;
    private readonly httpService;
    constructor(repo: Repository<Notification>, httpService: HttpService);
    sendBulkNotification(body: any, title: any, token: any, status: any): Promise<any>;
    create(createDto: any): Promise<any>;
    findAll(limit: number, offset: number, accountId: string): Promise<{
        result: Notification[];
        total: number;
    }>;
    update(id: number, accountId: string, status: boolean): Promise<Notification & {
        read: boolean;
    }>;
}
