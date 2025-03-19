import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { Repository } from 'typeorm';
import { StateDto } from './dto/state.dto';
import { State } from './entities/state.entity';
export declare class StateService {
    private readonly repo;
    constructor(repo: Repository<State>);
    create(dto: StateDto): Promise<any>;
    findAll(limit: number, offset: number, keyword: string, status: boolean): Promise<{
        result: State[];
        total: number;
    }>;
    find(limit: number, offset: number, keyword: string): Promise<{
        result: State[];
        total: number;
    }>;
    update(id: number, dto: StateDto): Promise<State & {
        name: string;
    }>;
    status(id: number, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<State> & State)[]>;
}
