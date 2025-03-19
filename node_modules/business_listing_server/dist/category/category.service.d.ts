import { Repository } from 'typeorm';
import { CategoryDto, CategoryPaginationSDto, StatusDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { DefaultStatus } from 'src/enum';
export declare class CategoryService {
    private readonly repo;
    constructor(repo: Repository<Category>);
    create(dto: CategoryDto): Promise<any>;
    findAll(limit: number, offset: number, keyword: string, status: DefaultStatus): Promise<{
        result: Category[];
        total: number;
    }>;
    find(limit: number, offset: number, keyword: string): Promise<{
        result: Category[];
        total: number;
    }>;
    findByUser(dto: CategoryPaginationSDto): Promise<{
        result: Category[];
        total: number;
    }>;
    findOne(id: string): Promise<Category>;
    update(id: string, dto: CategoryDto): Promise<Category & CategoryDto>;
    image(image: string, result: Category): Promise<Category & {
        image: string;
        imageName: string;
    }>;
    status(id: string, dto: StatusDto): Promise<Category & StatusDto>;
}
