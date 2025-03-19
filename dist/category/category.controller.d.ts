import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { CategoryService } from './category.service';
import { CategoryDto, CategoryPaginationSDto, PaginationSDto, StatusDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CategoryDto): Promise<any>;
    findAll(query: PaginationSDto): Promise<{
        result: import("./entities/category.entity").Category[];
        total: number;
    }>;
    find(query: CommonPaginationDto): Promise<{
        result: import("./entities/category.entity").Category[];
        total: number;
    }>;
    findByUser(dto: CategoryPaginationSDto): Promise<{
        result: import("./entities/category.entity").Category[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    update(id: string, dto: CategoryDto): Promise<import("./entities/category.entity").Category & CategoryDto>;
    status(id: string, dto: StatusDto): Promise<import("./entities/category.entity").Category & StatusDto>;
    image(id: string, file: Express.Multer.File): Promise<import("./entities/category.entity").Category & {
        image: string;
        imageName: string;
    }>;
}
