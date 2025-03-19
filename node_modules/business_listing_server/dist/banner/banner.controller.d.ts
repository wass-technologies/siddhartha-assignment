import { BannerService } from './banner.service';
import { BannerDto, BannerPaginationDto } from './dto/create-banner.dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(file: Express.Multer.File): Promise<any>;
    findAll(dto: BannerPaginationDto): Promise<{
        result: import("./entities/banner.entity").Banner[];
        count: number;
    }>;
    findByUser(dto: BannerPaginationDto): Promise<{
        result: import("./entities/banner.entity").Banner[];
        count: number;
    }>;
    image(id: string, file: Express.Multer.File): Promise<import("./entities/banner.entity").Banner & {
        image: string;
        imagePath: string;
    }>;
    status(id: string, dto: BannerDto): Promise<import("./entities/banner.entity").Banner & BannerDto>;
}
