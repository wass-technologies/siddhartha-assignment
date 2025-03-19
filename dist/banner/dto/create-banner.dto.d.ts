import { DefaultStatus } from 'src/enum';
export declare class CreateBannerDto {
}
export declare class BannerDto {
    status: DefaultStatus;
}
export declare class BannerPaginationDto {
    limit: number;
    offset: number;
    keyword: string;
    status: DefaultStatus;
}
