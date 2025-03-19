import { CategoryType, DefaultStatus } from 'src/enum';
export declare class CategoryDto {
    name: string;
}
export declare class PaginationSDto {
    limit: number;
    offset: number;
    keyword: string;
    status: DefaultStatus;
}
export declare class CategoryPaginationSDto {
    limit: number;
    offset: number;
    keyword: string;
    status: DefaultStatus;
    type: CategoryType;
}
export declare class StatusDto {
    status: DefaultStatus;
}
