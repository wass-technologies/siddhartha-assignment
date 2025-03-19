import { BannerDto, BannerPaginationDto } from './dto/create-banner.dto';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';
export declare class BannerService {
    private readonly repo;
    constructor(repo: Repository<Banner>);
    create(image: string): Promise<any>;
    findAll(dto: BannerPaginationDto): Promise<{
        result: Banner[];
        count: number;
    }>;
    findByUser(dto: BannerPaginationDto): Promise<{
        result: Banner[];
        count: number;
    }>;
    findOne(id: string): Promise<Banner>;
    image(image: string, result: Banner): Promise<Banner & {
        image: string;
        imagePath: string;
    }>;
    status(id: string, dto: BannerDto): Promise<Banner & BannerDto>;
}
