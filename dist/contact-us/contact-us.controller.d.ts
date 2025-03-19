import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
export declare class ContactUsController {
    private readonly contactUsService;
    constructor(contactUsService: ContactUsService);
    create(dto: CreateContactUsDto): Promise<any>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: import("./entities/contact-us.entity").ContactUs[];
        count: number;
    }>;
}
