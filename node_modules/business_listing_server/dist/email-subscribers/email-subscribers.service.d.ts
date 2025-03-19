import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriber } from './entities/email-subscriber.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
export declare class EmailSubscribersService {
    private readonly repo;
    constructor(repo: Repository<EmailSubscriber>);
    create(dto: CreateEmailSubscriberDto): Promise<{
        message: string;
    }>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: EmailSubscriber[];
        count: number;
    }>;
}
