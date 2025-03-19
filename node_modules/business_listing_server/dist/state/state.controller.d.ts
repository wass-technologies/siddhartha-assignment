import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { PaginationSDto, StateDto } from './dto/state.dto';
import { StateService } from './state.service';
export declare class StateController {
    private readonly stateService;
    constructor(stateService: StateService);
    create(dto: StateDto): Promise<any>;
    findAll(query: PaginationSDto): Promise<{
        result: import("./entities/state.entity").State[];
        total: number;
    }>;
    find(query: PaginationSDto): Promise<{
        result: import("./entities/state.entity").State[];
        total: number;
    }>;
    update(id: string, dto: StateDto): Promise<import("./entities/state.entity").State & {
        name: string;
    }>;
    status(id: string, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<import("./entities/state.entity").State> & import("./entities/state.entity").State)[]>;
}
