import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Repository } from 'typeorm';
import { CityDto, UpdateCityDto } from './dto/city.dto';
import { City } from './entities/city.entity';
export declare class CityService {
    private readonly repo;
    constructor(repo: Repository<City>);
    create(dto: CityDto): Promise<any>;
    findAll(limit: number, offset: number, keyword: string, status: boolean, stateId: number): Promise<{
        result: City[];
        total: number;
    }>;
    find(limit: number, offset: number, keyword: string, stateId: number): Promise<{
        result: City[];
        total: number;
    }>;
    findListAll(): Promise<{
        result: City[];
        total: number;
    }>;
    findOne(id: number): Promise<City>;
    update(id: number, dto: UpdateCityDto): Promise<City & {
        name: string;
    }>;
    status(id: number, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<City> & City)[]>;
}
