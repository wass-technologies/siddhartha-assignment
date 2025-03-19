import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
import { Account } from 'src/account/entities/account.entity';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(dto: CreateBlogDto, user: Account): Promise<any>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: import("./entities/blog.entity").Blog[];
        count: number;
    }>;
    findAllByAdmin(dto: DefaultStatusPaginationDto): Promise<{
        result: import("./entities/blog.entity").Blog[];
        count: number;
    }>;
    findOne(id: string): Promise<import("./entities/blog.entity").Blog>;
    update(id: string, dto: UpdateBlogDto): Promise<import("./entities/blog.entity").Blog & UpdateBlogDto>;
    image(id: string, file: Express.Multer.File): Promise<import("./entities/blog.entity").Blog & {
        image: string;
        imagePath: string;
    }>;
    status(id: string, dto: DefaultStatusDto): Promise<import("./entities/blog.entity").Blog & DefaultStatusDto>;
}
