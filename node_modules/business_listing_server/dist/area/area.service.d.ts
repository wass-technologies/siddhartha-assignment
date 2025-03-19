import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Repository } from 'typeorm';
import { AreaDto, UpdateAreaDto } from './dto/area.dto';
import { Area } from './entities/area.entity';
export declare class AreaService {
    private readonly repo;
    constructor(repo: Repository<Area>);
    create(dto: AreaDto): Promise<any>;
    findAll(limit: number, offset: number, keyword: string, status: boolean, cityId: number): Promise<{
        result: Area[];
        total: number;
    }>;
    find(limit: number, offset: number, keyword: string, cityId: number): Promise<{
        result: Area[];
        total: number;
    }>;
    findOne(id: number): Promise<Area>;
    update(id: number, dto: UpdateAreaDto): Promise<Area & {
        name: string;
    }>;
    status(id: number, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<Area> & Area)[]>;
}
