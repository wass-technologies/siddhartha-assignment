import { DefaultStatus } from 'src/enum';
export declare class PaginationDto {
    limit: number;
    offset: number;
    keyword: string;
    status: DefaultStatus;
}
