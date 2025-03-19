import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { AreaService } from './area.service';
import { AreaDto, PaginationSDto, UpdateAreaDto } from './dto/area.dto';
export declare class AreaController {
    private readonly areaService;
    constructor(areaService: AreaService);
    create(dto: AreaDto): Promise<any>;
    findAll(query: PaginationSDto, cityId: string): Promise<{
        result: import("./entities/area.entity").Area[];
        total: number;
    }>;
    find(query: PaginationSDto, cityId: string): Promise<{
        result: import("./entities/area.entity").Area[];
        total: number;
    }>;
    update(id: string, dto: UpdateAreaDto): Promise<import("./entities/area.entity").Area & {
        name: string;
    }>;
    status(id: string, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<import("./entities/area.entity").Area> & import("./entities/area.entity").Area)[]>;
}
