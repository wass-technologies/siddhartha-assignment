import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ContactUs } from './entities/contact-us.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
export declare class ContactUsService {
    private readonly repo;
    constructor(repo: Repository<ContactUs>);
    create(dto: CreateContactUsDto): Promise<any>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: ContactUs[];
        count: number;
    }>;
}
