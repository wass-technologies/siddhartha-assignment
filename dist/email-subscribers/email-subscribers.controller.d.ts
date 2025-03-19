import { EmailSubscribersService } from './email-subscribers.service';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
export declare class EmailSubscribersController {
    private readonly emailSubscribersService;
    constructor(emailSubscribersService: EmailSubscribersService);
    create(dto: CreateEmailSubscriberDto): Promise<{
        message: string;
    }>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: import("./entities/email-subscriber.entity").EmailSubscriber[];
        count: number;
    }>;
}
