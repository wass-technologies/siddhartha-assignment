import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { CityService } from './city.service';
import { CityDto, PaginationSDto, UpdateCityDto } from './dto/city.dto';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    create(dto: CityDto): Promise<any>;
    findList(): Promise<{
        result: import("./entities/city.entity").City[];
        total: number;
    }>;
    findAll(query: PaginationSDto, stateId: string): Promise<{
        result: import("./entities/city.entity").City[];
        total: number;
    }>;
    find(query: PaginationSDto, stateId: string): Promise<{
        result: import("./entities/city.entity").City[];
        total: number;
    }>;
    update(id: string, dto: UpdateCityDto): Promise<import("./entities/city.entity").City & {
        name: string;
    }>;
    status(id: string, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<import("./entities/city.entity").City> & import("./entities/city.entity").City)[]>;
}
