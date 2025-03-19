import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
export declare class BlogsService {
    private readonly repo;
    constructor(repo: Repository<Blog>);
    create(dto: CreateBlogDto): Promise<any>;
    findAll(dto: CommonPaginationDto): Promise<{
        result: Blog[];
        count: number;
    }>;
    findAllByAdmin(dto: DefaultStatusPaginationDto): Promise<{
        result: Blog[];
        count: number;
    }>;
    findOne(id: string): Promise<Blog>;
    update(id: string, dto: UpdateBlogDto): Promise<Blog & UpdateBlogDto>;
    image(image: string, result: Blog): Promise<Blog & {
        image: string;
        imagePath: string;
    }>;
    status(id: string, dto: DefaultStatusDto): Promise<Blog & DefaultStatusDto>;
}
