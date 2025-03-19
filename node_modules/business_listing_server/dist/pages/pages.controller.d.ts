import { PageDto } from './dto/page.dto';
import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(): Promise<import("./entities/page.entity").Page[]>;
    findOne(id: string): Promise<unknown>;
    update(id: string, updatePageDto: PageDto): Promise<PageDto & import("./entities/page.entity").Page>;
}
